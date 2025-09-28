// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import twilio from "twilio";
// import farmerInfo from "./models/farmerInfo.js";
// import Notification from "./models/forecast_not.js";
// import cropInfo from "./models/crops.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const API_KEY = process.env.API_KEY;
// const MONGO_URI = process.env.MONGO_URI;

// // ========================
// // 🔹 Twilio setup
// // ========================
// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// // Phone formatting
// function formatPhone(phone) {
//   let digits = phone.replace(/\D/g, "");
//   if (digits.startsWith("91")) digits = digits.substring(2);
//   return `+91${digits}`;
// }

// // ========================
// // 🔹 MongoDB Connect
// // ========================
// mongoose
//   .connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // ========================
// // 🔹 AUTH HELPERS
// // ========================
// import jwt from "jsonwebtoken";
// const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// function generateToken(farmer) {
//   return jwt.sign({ id: farmer._id, role: farmer.role }, JWT_SECRET, {
//     expiresIn: "1d",
//   });
// }

// function authMiddleware(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader) return res.status(401).json({ error: "No token provided" });

//   const token = authHeader.split(" ")[1];
//   if (!token) return res.status(401).json({ error: "Invalid token format" });

//   jwt.verify(token, JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ error: "Invalid/Expired token" });
//     req.user = decoded; // { id, role }
//     next();
//   });
// }

// function adminMiddleware(req, res, next) {
//   if (req.user.role.toLowerCase() !== "admin")
//     return res.status(403).json({ error: "Access denied. Admins only." });
//   next();
// }

// // ========================
// // 🔹 REGISTER / LOGIN
// // ========================
// app.post("/api/register", async (req, res) => {
//   try {
//     const { email, phone, fullName, password, confirmPassword } = req.body;
//     const formattedPhone = formatPhone(phone);

//     if (password !== confirmPassword)
//       return res.status(400).json({ error: "Passwords do not match" });

//     let farmer = await farmerInfo.findOne({ phone: formattedPhone });

//     if (farmer) {
//       if (farmer.role === "admin" && (!farmer.email || farmer.email === "")) {
//         farmer.email = email;
//         farmer.fullName = fullName;
//         farmer.password = password;
//         farmer.confirmPassword = confirmPassword;
//         await farmer.save();
//         return res.json({ success: true, farmer });
//       }
//       return res.status(400).json({ error: "User already registered" });
//     }

//     farmer = new farmerInfo({
//       email,
//       phone: formattedPhone,
//       fullName,
//       password,
//       confirmPassword,
//       role: "farmer",
//     });

//     await farmer.save();
//     res.json({ success: true, farmer });
//   } catch (err) {
//     console.error("Register error:", err);
//     res.status(500).json({ error: "Failed to register" });
//   }
// });

// app.post("/api/login", async (req, res) => {
//   try {
//     const { phone, password } = req.body;
//     const formattedPhone = formatPhone(phone);

//     const farmer = await farmerInfo.findOne({ phone: formattedPhone });
//     if (!farmer || farmer.password !== password)
//       return res.status(401).json({ error: "Invalid credentials" });

//     const token = generateToken(farmer);
//     res.json({ success: true, farmer, token });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ error: "Login failed" });
//   }
// });

// // Reset Password
// app.post("/api/reset-password", async (req, res) => {
//   try {
//     const { phone, newPassword } = req.body;
//     const formattedPhone = formatPhone(phone);

//     const farmer = await farmerInfo.findOne({ phone: formattedPhone });
//     if (!farmer) return res.status(404).json({ error: "Farmer not found" });

//     farmer.password = newPassword;
//     farmer.confirmPassword = newPassword;
//     await farmer.save();

//     res.json({ success: true, message: "Password updated" });
//   } catch (err) {
//     console.error("Reset error:", err);
//     res.status(500).json({ error: "Reset failed" });
//   }
// });

// // ========================
// // 🔹 OTP ROUTES
// // ========================
// app.post("/api/send-otp", async (req, res) => {
//   try {
//     const { phone } = req.body;
//     const formattedPhone = formatPhone(phone);

//     const verification = await client.verify.v2
//       .services(process.env.TWILIO_VERIFY_SID)
//       .verifications.create({ to: formattedPhone, channel: "sms" });

//     res.json({ success: true, status: verification.status });
//   } catch (err) {
//     console.error("OTP send error:", err);
//     res.status(500).json({ error: "OTP send failed" });
//   }
// });

// app.post("/api/verify-otp", async (req, res) => {
//   try {
//     const { phone, otp, code } = req.body;
//     const formattedPhone = formatPhone(phone);

//     const finalCode = code || otp;
//     if (!finalCode) return res.status(400).json({ error: "OTP is required" });

//     const verificationCheck = await client.verify.v2
//       .services(process.env.TWILIO_VERIFY_SID)
//       .verificationChecks.create({ to: formattedPhone, code: finalCode });

//     if (verificationCheck.status === "approved") {
//       res.json({ success: true, message: "OTP verified" });
//     } else {
//       res.status(400).json({ error: "Invalid OTP" });
//     }
//   } catch (err) {
//     console.error("OTP verify error:", err);
//     res.status(500).json({ error: "OTP verification failed" });
//   }
// });

// // ========================
// // 🔹 ADMIN ROUTES
// // ========================
// app.post("/api/add-admin", authMiddleware, adminMiddleware, async (req, res) => {
//   try {
//     const { phone } = req.body;
//     const formattedPhone = formatPhone(phone);

//     let farmer = await farmerInfo.findOne({ phone: formattedPhone });

//     if (farmer) {
//       if (farmer.role === "admin")
//         return res.status(400).json({ error: "User is already an admin" });
//       farmer.role = "admin";
//       await farmer.save();
//     } else {
//       farmer = new farmerInfo({
//         phone: formattedPhone,
//         email: "",
//         fullName: "",
//         password: "",
//         confirmPassword: "",
//         role: "admin",
//       });
//       await farmer.save();
//     }

//     res.json({ success: true, message: `${formattedPhone} is now an admin` });
//   } catch (err) {
//     console.error("Add Admin Error:", err);
//     res.status(500).json({ error: "Failed to add admin" });
//   }
// });

// app.get("/api/admins", authMiddleware, adminMiddleware, async (req, res) => {
//   try {
//     const admins = await farmerInfo.find({ role: "admin" }).select("phone");
//     res.json(admins);
//   } catch (err) {
//     console.error("Fetch Admins Error:", err);
//     res.status(500).json({ error: "Failed to fetch admins" });
//   }
// });

// app.delete("/api/admins/:id", authMiddleware, adminMiddleware, async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id))
//       return res.status(400).json({ error: "Invalid admin ID" });

//     const farmer = await farmerInfo.findById(id);
//     if (!farmer) return res.status(404).json({ error: "Admin not found" });

//     farmer.role = "farmer";
//     await farmer.save();

//     res.json({ success: true, message: `${farmer.phone} is no longer an admin` });
//   } catch (err) {
//     console.error("Delete Admin Error:", err);
//     res.status(500).json({ error: "Failed to delete admin" });
//   }
// });

// app.put("/api/admins/:id", authMiddleware, adminMiddleware, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { newPhone } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id))
//       return res.status(400).json({ error: "Invalid admin ID" });

//     const farmer = await farmerInfo.findById(id);
//     if (!farmer) return res.status(404).json({ error: "Admin not found" });

//     farmer.phone = formatPhone(newPhone);
//     await farmer.save();

//     res.json({ success: true, message: `Phone updated to ${farmer.phone}` });
//   } catch (err) {
//     console.error("Update Admin Error:", err);
//     res.status(500).json({ error: "Failed to update admin" });
//   }
// });

// // ========================
// // 🔹 WEATHER + ALERTS
// // ========================
// app.get("/api/fetch-weather/:city", authMiddleware, adminMiddleware, async (req, res) => {
//   const city = req.params.city;
//   const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     if (!data.list) return res.status(400).json({ error: data.message });

//     const dailyData = {};
//     data.list.forEach((item) => {
//       const date = item.dt_txt.split(" ")[0];
//       if (!dailyData[date])
//         dailyData[date] = { temps: [], humidities: [], pressures: [], winds: [], descriptions: [] };
//       dailyData[date].temps.push(item.main.temp);
//       dailyData[date].humidities.push(item.main.humidity);
//       dailyData[date].pressures.push(item.main.pressure);
//       dailyData[date].winds.push(item.wind.speed);
//       dailyData[date].descriptions.push(item.weather[0].description);
//     });

//     let savedForecasts = [];
//     for (const date of Object.keys(dailyData).slice(0, 5)) {
//       const d = dailyData[date];
//       const avg = (arr) => (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);
//       const summary = {
//         city,
//         date,
//         description: d.descriptions
//           .sort((a, b) => d.descriptions.filter((v) => v === a).length - d.descriptions.filter((v) => v === b).length)
//           .pop(),
//         temp: avg(d.temps),
//         humidity: avg(d.humidities),
//         pressure: avg(d.pressures),
//         wind: avg(d.winds),
//       };

//       summary.alert = summary.temp > 40 ? "Extreme Heat" : summary.temp < 5 ? "Extreme Cold" : null;
//       savedForecasts.push(summary);

//       if (summary.alert) {
//         const farmers = await farmerInfo.find({}, "phone");
//         const numbers = farmers.map((f) => f.phone);

//         await Promise.all(
//           numbers.map((num) =>
//             client.messages.create({
//               body: `Weather Alert for ${city} on ${date}: ${summary.alert}`,
//               from: "+12184299513",
//               to: num,
//             })
//           )
//         );
//       }
//     }

//     res.json({ success: true, savedForecasts });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// app.post("/api/send-sms", authMiddleware, adminMiddleware, async (req, res) => {
//   const { alertMsg, city, date, lang } = req.body;
//   try {
//     const farmers = await farmerInfo.find({}, "phone");
//     if (!farmers.length) return res.status(404).json({ success: false, error: "No farmers found" });

//     const numbers = farmers.map((f) => formatPhone(f.phone));
//     const day = new Date(date).toLocaleDateString("en-US", { weekday: "long" });
//     const finalMsg = `⚠️ Weather Alert for ${city} on ${date}: ${alertMsg}`;

//     await Promise.all(numbers.map((num) => client.messages.create({ body: finalMsg, from: "+16202548366", to: num })));

//     const notification = new Notification({ city, alertMsg: finalMsg, date, day, recipients: numbers });
//     await notification.save();

//     res.json({ success: true, sentTo: numbers.length });
//   } catch (err) {
//     console.error("SMS Error:", err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// // ========================
// // 🔹 CROPS
// // ========================


// // app.post("/api/crops/submit", async (req, res) => {
// //   try {
// //     const cropDoc = new cropInfo(req.body);
// //     await cropDoc.save();
// //     res.json({ message: "Crop saved successfully", savedCrop: cropDoc });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Error saving crop data", error: error.message });
// //   }
// // });

// // profile
// // app.get("/api/profile", authMiddleware, async (req, res) => {
// //   try {
// //     const farmer = await farmerInfo
// //       .findById(req.user.id)
// //       .select("-password -confirmPassword");

// //     if (!farmer) {
// //       return res.status(404).json({ error: "User not found" });
// //     }

// //     res.json({ success: true, farmer });
// //   } catch (err) {
// //     console.error("Profile fetch error:", err);
// //     res.status(500).json({ error: "Failed to fetch profile" });
// //   }
// // });

// // Update own profile
// // app.put("/api/profile", authMiddleware, async (req, res) => {
// //   try {
// //     const { email, fullName } = req.body;

// //     const farmer = await farmerInfo.findById(req.user.id);
// //     if (!farmer) return res.status(404).json({ error: "User not found" });

// //     if (email) farmer.email = email;
// //     if (fullName) farmer.fullName = fullName;

// //     await farmer.save();

// //     res.json({ success: true, farmer });
// //   } catch (err) {
// //     console.error("Profile update error:", err);
// //     res.status(500).json({ error: "Failed to update profile" });
// //   }
// // });
// app.get('/api/profile', authMiddleware, async (req, res) => {
//   try {
   
//     const userId = req.user.id; // set in authMiddleware from JWT
//     const user = await farmerInfo.findById(userId).lean();

//     if (!user) return res.status(404).json({ error: "User not found" });

//     // const crops = await cropInfo.find({ district: user.district }).lean();
//     // or if you want exact ownership, you may save farmerId in cropInfo
//     const crops = await cropInfo.find({ farmerId: userId }).lean();

//     res.json({ success: true, user, crops });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: "Server error" });
//   }
// });

// // Update own profile
// app.put("/api/profile", authMiddleware, async (req, res) => {
//   try {
//     const { email, fullName } = req.body;

//     const farmer = await farmerInfo.findById(req.user.id);
//     if (!farmer) return res.status(404).json({ error: "User not found" });

//     if (email) farmer.email = email;
//     if (fullName) farmer.fullName = fullName;

//     await farmer.save();

//     res.json({ success: true, farmer });
//   } catch (err) {
//     console.error("Profile update error:", err);
//     res.status(500).json({ error: "Failed to update profile" });
//   }
// });

// // ========================
// // 🔹 START SERVER
// // ========================
// app.listen(5000, () => console.log("Server running on port 5000"));

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import twilio from "twilio";
import farmerInfo from "./models/farmerInfo.js";
import Notification from "./models/forecast_not.js";
import cropInfo from "./models/crops.js";
import fetch from "node-fetch"; // if using Node.js < 18


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;
const MONGO_URI = process.env.MONGO_URI;

// ========================
// 🔹 Twilio setup
// ========================
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
//language translation karo
// async function translateMessage(text, targetLang) {
//   if (!targetLang || targetLang === "en") return text; // no translation needed
//   try {
//     const res = await fetch("http://localhost:5000/translate", {  // your translation API
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ text, lang: targetLang })
//     });
//     const data = await res.json();
//     return data.translatedText || text;
//   } catch (err) {
//     console.error("Translation failed:", err);
//     return text; // fallback to original
//   }
// }

//translate wali cheez
// async function translateMessage(text, targetLang) {
//   if (!targetLang || targetLang === "en") return text; // no translation needed
//   if (!["hi-IN","or-IN","mr-IN"].includes(targetLang)) return text; // limit to selected languages

//   // MyMemory API requires source|target, we'll assume source = English
//   const langMap = { "hi-IN": "hi", "or-IN": "or", "mr-IN": "mr" };
//   const target = langMap[targetLang];
//   const source = "en";

//   try {
//     const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
//       text
//     )}&langpair=${source}|${target}`;

//     const res = await fetch(apiUrl);
//     const data = await res.json();

//     // The translation is in data.responseData.translatedText
//     return data.responseData?.translatedText || text;
//   } catch (err) {
//     console.error("Translation failed:", err);
//     return text; // fallback to original
//   }
// }
// ========================
// 🔹 TRANSLATION FUNCTION
// Only supports hi-IN, or-IN, mr-IN
// ========================
async function translateMessage(text, targetLang) {
  if (!text) return "";
  if (!["hi-IN", "or-IN", "mr-IN"].includes(targetLang)) return text;

  // Map internal codes to MyMemory language codes
  const langMap = {
    "hi-IN": "hi",
    "or-IN": "or",
    "mr-IN": "mr",
  };
  const target = langMap[targetLang];
  const source = "en"; // assume English as source

  try {
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=${source}|${target}`;

    const res = await fetch(apiUrl);
    const data = await res.json();

    const translation = data.responseData?.translatedText;

    // Fallback if API returns same text or empty
    if (!translation || translation.trim().length === 0 || translation === text) {
      console.warn("Translation API returned fallback text, returning original");
      return text;
    }

    return translation;
  } catch (err) {
    console.error("Translation failed:", err);
    return text; // fallback
  }
}

// Phone formatting
function formatPhone(phone) {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("91")) digits = digits.substring(2);
  return `+91${digits}`;
}

// ========================
// 🔹 MongoDB Connect
// ========================
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ========================
// 🔹 AUTH HELPERS
// ========================
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

function generateToken(farmer) {
  return jwt.sign({ id: farmer._id, role: farmer.role }, JWT_SECRET, {
    expiresIn: "1d",
  });
}

// function authMiddleware(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader) return res.status(401).json({ error: "No token provided" });

//   const token = authHeader.split(" ")[1];
//   if (!token) return res.status(401).json({ error: "Invalid token format" });

//   jwt.verify(token, JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ error: "Invalid/Expired token" });
//     req.user = decoded; // { id, role }
//     next();
//   });
// }

// function adminMiddleware(req, res, next) {
//   if (req.user.role.toLowerCase() !== "admin")
//     return res.status(403).json({ error: "Access denied. Admins only." });
//   next();
// }
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = decoded; // decoded contains { id, role }
    next();
  });
}

// ✅ middleware to check admin role
function adminMiddleware(req, res, next) {
  console.log("Decoded user from token:", req.user); 
  // prevent your toLowerCase crash
  if (!req.user || !req.user.role) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role.toLowerCase() !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }

  next();
}

// ========================
// 🔹 REGISTER / LOGIN
// ========================
app.post("/api/register", async (req, res) => {
  try {
    const { email, phone, fullName, password, confirmPassword } = req.body;
    const formattedPhone = formatPhone(phone);

    if (password !== confirmPassword)
      return res.status(400).json({ error: "Passwords do not match" });

    let farmer = await farmerInfo.findOne({ phone: formattedPhone });

    if (farmer) {
      if (farmer.role === "admin" && (!farmer.email || farmer.email === "")) {
        farmer.email = email;
        farmer.fullName = fullName;
        farmer.password = password;
        farmer.confirmPassword = confirmPassword;
        await farmer.save();
        return res.json({ success: true, farmer });
      }
      return res.status(400).json({ error: "User already registered" });
    }

    farmer = new farmerInfo({
      email,
      phone: formattedPhone,
      fullName,
      password,
      confirmPassword,
      role: "farmer",
    });

    await farmer.save();
    res.json({ success: true, farmer });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Failed to register" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { phone, password } = req.body;
    const formattedPhone = formatPhone(phone);

    const farmer = await farmerInfo.findOne({ phone: formattedPhone });
    if (!farmer || farmer.password !== password)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken(farmer);
    res.json({ success: true, farmer, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// Reset Password
app.post("/api/reset-password", async (req, res) => {
  try {
    const { phone, newPassword } = req.body;
    const formattedPhone = formatPhone(phone);

    const farmer = await farmerInfo.findOne({ phone: formattedPhone });
    if (!farmer) return res.status(404).json({ error: "Farmer not found" });

    farmer.password = newPassword;
    farmer.confirmPassword = newPassword;
    await farmer.save();

    res.json({ success: true, message: "Password updated" });
  } catch (err) {
    console.error("Reset error:", err);
    res.status(500).json({ error: "Reset failed" });
  }
});

// ========================
// 🔹 OTP ROUTES
// ========================
app.post("/api/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;
    const formattedPhone = formatPhone(phone);

    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verifications.create({ to: formattedPhone, channel: "sms" });

    res.json({ success: true, status: verification.status });
  } catch (err) {
    console.error("OTP send error:", err);
    res.status(500).json({ error: "OTP send failed" });
  }
});

app.post("/api/verify-otp", async (req, res) => {
  try {
    const { phone, otp, code } = req.body;
    const formattedPhone = formatPhone(phone);

    const finalCode = code || otp;
    if (!finalCode) return res.status(400).json({ error: "OTP is required" });

    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verificationChecks.create({ to: formattedPhone, code: finalCode });

    if (verificationCheck.status === "approved") {
      res.json({ success: true, message: "OTP verified" });
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (err) {
    console.error("OTP verify error:", err);
    res.status(500).json({ error: "OTP verification failed" });
  }
});

// ========================
// 🔹 ADMIN ROUTES
// ========================
app.post("/api/add-admin", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { phone } = req.body;
    const formattedPhone = formatPhone(phone);

    let farmer = await farmerInfo.findOne({ phone: formattedPhone });

    if (farmer) {
      if (farmer.role === "admin")
        return res.status(400).json({ error: "User is already an admin" });
      farmer.role = "admin";
      await farmer.save();
    } else {
      farmer = new farmerInfo({
        phone: formattedPhone,
        email: "",
        fullName: "",
        password: "",
        confirmPassword: "",
        role: "admin",
      });
      await farmer.save();
    }

    res.json({ success: true, message: `${formattedPhone} is now an admin` });
  } catch (err) {
    console.error("Add Admin Error:", err);
    res.status(500).json({ error: "Failed to add admin" });
  }
});

app.get("/api/admins", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const admins = await farmerInfo.find({ role: "admin" }).select("phone");
    res.json(admins);
  } catch (err) {
    console.error("Fetch Admins Error:", err);
    res.status(500).json({ error: "Failed to fetch admins" });
  }
});

app.delete("/api/admins/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid admin ID" });

    const farmer = await farmerInfo.findById(id);
    if (!farmer) return res.status(404).json({ error: "Admin not found" });

    farmer.role = "farmer";
    await farmer.save();

    res.json({ success: true, message: `${farmer.phone} is no longer an admin` });
  } catch (err) {
    console.error("Delete Admin Error:", err);
    res.status(500).json({ error: "Failed to delete admin" });
  }
});

app.put("/api/admins/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { newPhone } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid admin ID" });

    const farmer = await farmerInfo.findById(id);
    if (!farmer) return res.status(404).json({ error: "Admin not found" });

    farmer.phone = formatPhone(newPhone);
    await farmer.save();

    res.json({ success: true, message: `Phone updated to ${farmer.phone}` });
  } catch (err) {
    console.error("Update Admin Error:", err);
    res.status(500).json({ error: "Failed to update admin" });
  }
});

// ========================
// 🔹 WEATHER + ALERTS
// ========================
app.get("/api/fetch-weather/:city", authMiddleware, adminMiddleware, async (req, res) => {
  const city = req.params.city;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!data.list) return res.status(400).json({ error: data.message });

    const dailyData = {};
    data.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!dailyData[date])
        dailyData[date] = { temps: [], humidities: [], pressures: [], winds: [], descriptions: [] };
      dailyData[date].temps.push(item.main.temp);
      dailyData[date].humidities.push(item.main.humidity);
      dailyData[date].pressures.push(item.main.pressure);
      dailyData[date].winds.push(item.wind.speed);
      dailyData[date].descriptions.push(item.weather[0].description);
    });

    let savedForecasts = [];
    for (const date of Object.keys(dailyData).slice(0, 5)) {
      const d = dailyData[date];
      const avg = (arr) => (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);
      const summary = {
        city,
        date,
        description: d.descriptions
          .sort((a, b) => d.descriptions.filter((v) => v === a).length - d.descriptions.filter((v) => v === b).length)
          .pop(),
        temp: avg(d.temps),
        humidity: avg(d.humidities),
        pressure: avg(d.pressures),
        wind: avg(d.winds),
      };

      summary.alert = summary.temp > 40 ? "Extreme Heat" : summary.temp < 5 ? "Extreme Cold" : null;
      savedForecasts.push(summary);

      if (summary.alert) {
        const farmers = await farmerInfo.find({}, "phone");
        const numbers = farmers.map((f) => f.phone);

        await Promise.all(
          numbers.map((num) =>
            client.messages.create({
              body: `Weather Alert for ${city} on ${date}: ${summary.alert}`,
              from: "+12184299513",
              to: num,
            })
          )
        );
      }
    }

    res.json({ success: true, savedForecasts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// app.post("/api/send-sms", authMiddleware, adminMiddleware, async (req, res) => {
//   const { alertMsg, city, date, lang } = req.body;
//   try {
//     const farmers = await farmerInfo.find({}, "phone");
//     if (!farmers.length) return res.status(404).json({ success: false, error: "No farmers found" });

//     const numbers = farmers.map((f) => formatPhone(f.phone));
//     const day = new Date(date).toLocaleDateString("en-US", { weekday: "long" });
//     const finalMsg = `⚠️ Weather Alert for ${city} on ${date}: ${alertMsg}`;

//     await Promise.all(numbers.map((num) => client.messages.create({ body: finalMsg, from: "+16202548366", to: num })));

//     const notification = new Notification({ city, alertMsg: finalMsg, date, day, recipients: numbers });
//     await notification.save();

//     res.json({ success: true, sentTo: numbers.length });
//   } catch (err) {
//     console.error("SMS Error:", err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });
// app.post("/api/send-sms", authMiddleware, adminMiddleware, async (req, res) => {
//   const { alertMsg, city, date, lang } = req.body;

//   try {
//     const farmers = await farmerInfo.find({}, "phone");
//     if (!farmers.length) return res.status(404).json({ success: false, error: "No farmers found" });

//     const numbers = farmers.map((f) => formatPhone(f.phone));
//     const day = new Date(date).toLocaleDateString("en-US", { weekday: "long" });

//     // ✅ Translate using your language API
//     let translatedMsg = alertMsg;
//     if (lang && lang !== "en") {
//       const translationRes = await fetch(`http://localhost:5000/translate`, {  // replace with your API
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: alertMsg, targetLang: lang })
//       });
//       const translationData = await translationRes.json();
//       translatedMsg = translationData.translatedText || alertMsg;
//     }

//     const finalMsg = `⚠️ Weather Alert for ${city} on ${date}: ${translatedMsg}`;

//     await Promise.all(numbers.map((num) =>
//       client.messages.create({ body: finalMsg, from: "+16202548366", to: num })
//     ));

//     const notification = new Notification({ city, alertMsg: finalMsg, date, day, recipients: numbers });
//     await notification.save();

//     res.json({ success: true, sentTo: numbers.length });
//   } catch (err) {
//     console.error("SMS Error:", err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });
// app.post("/api/send-sms", authMiddleware, adminMiddleware, async (req, res) => {
//   const { alertMsg, city, date, lang } = req.body;

//   try {
//     const farmers = await farmerInfo.find({}, "phone");
//     if (!farmers.length) return res.status(404).json({ success: false, error: "No farmers found" });

//     const numbers = farmers.map(f => formatPhone(f.phone));
//     const day = new Date(date).toLocaleDateString("en-US", { weekday: "long" });

//     // Translate alert message if needed
//     let translatedMsg = alertMsg;
//     if (lang && lang !== "en") {
//       translatedMsg = await translateMessage(alertMsg, lang); // call a translation function
//     }

//     const finalMsg = `⚠️ Weather Alert for ${city} on ${date}: ${translatedMsg}`;

//     await Promise.all(
//       numbers.map(num => client.messages.create({ body: finalMsg, from: "+16202548366", to: num }))
//     );

//     const notification = new Notification({ city, alertMsg: finalMsg, date, day, recipients: numbers });
//     await notification.save();

//     res.json({ success: true, sentTo: numbers.length });
//   } catch (err) {
//     console.error("SMS Error:", err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });
app.post("/api/send-sms", authMiddleware, adminMiddleware, async (req, res) => {
  const { alertMsg, city, date, lang } = req.body;
console.log("Language received from frontend:", lang);
  try {
    const farmers = await farmerInfo.find({}, "phone");
    if (!farmers.length)
      return res.status(404).json({ success: false, error: "No farmers found" });

    const numbers = farmers.map(f => formatPhone(f.phone));
    const day = new Date(date).toLocaleDateString("en-US", { weekday: "long" });

    // Translate message using our new function
    // const translatedMsg = await translateMessage(alertMsg, lang);

    // const finalMsg = `⚠️ Weather Alert for ${city} on ${date}: ${translatedMsg}`;
    // Translate message if needed
const translatedMsg = await translateMessage(alertMsg, lang);
const finalMsg = `⚠️ Weather Alert for ${city} on ${date}: ${translatedMsg}`;
console.log("Translated message:", translatedMsg);

    await Promise.all(
      numbers.map(num => client.messages.create({ body: finalMsg, from: "+12135836515", to: num }))
    );

    const notification = new Notification({ city, alertMsg: finalMsg, date, day, recipients: numbers });
    await notification.save();

    res.json({ success: true, sentTo: numbers.length });
  } catch (err) {
    console.error("SMS Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ========================
// 🔹 CROPS
// ========================
app.post("/api/crops", async (req, res) => {
  try {
    const cropDoc = new cropInfo(req.body);
    await cropDoc.save();
    res.status(201).json({ message: "Crop data saved successfully", crop: cropDoc });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error saving crop data", error });
  }
});

// app.post("/api/crops/submit", async (req, res) => {
//   try {
//     const cropDoc = new cropInfo(req.body);
//     await cropDoc.save();
//     res.json({ message: "Crop saved successfully", savedCrop: cropDoc });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error saving crop data", error: error.message });
//   }
// });
// app.post("/api/crops/submit", async (req, res) => {
//   try {
//     // 1️⃣ Save the crop data to MongoDB
//     const cropDoc = new cropInfo(req.body);
//     await cropDoc.save();
//     const payload = {
//       district: req.body.district,
//   crop_name: req.body.crop,
//   season:req.body.season,
//   sown_area: req.body.area,
//   fertilizer_use: req.body.fertilizer_use,
//   pesticide_use: req.body.pesticide_use,
//   temp: req.body.temp,
//   humidity: req.body.humidity,
//   n: req.body.n,
//   p: req.body.p,
//   k: req.body.k,
//   ph: req.body.ph,
// };

// const mlResponse = await fetch("http://localhost:5001/predict", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(payload),
// });

   

//     let prediction = null;
//     try {
//       prediction = await mlResponse.json(); // parse ML API response
//     } catch (err) {
//       console.error("ML API response parse error:", err);
//     }

//     // 3️⃣ Return combined result
//     res.json({
//       message: "Crop saved and prediction generated successfully",
//       savedCrop: cropDoc,
//       prediction, // this now contains ML response
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Error saving crop data or generating prediction",
//       error: error.message,
//     });
//   }
// });
app.post("/api/crops/submit", async (req, res) => {
  try {
    // 1️⃣ Save the crop data to MongoDB
    const cropDoc = new cropInfo(req.body);
    await cropDoc.save();
    const payload = {
      district: req.body.district,
  crop_name: req.body.crop,
  season:req.body.season,
  sown_area: req.body.area,
  fertilizer_use: req.body.fertilizer_use,
  pesticide_use: req.body.pesticide_use,
  temp: req.body.temp,
  humidity: req.body.humidity,
  n: req.body.n,
  p: req.body.p,
  k: req.body.k,
  ph: req.body.ph,
};

const mlResponse = await fetch("http://localhost:5001/predict", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

   

    let prediction = null;
    try {
      prediction = await mlResponse.json(); // parse ML API response
    } catch (err) {
      console.error("ML API response parse error:", err);
    }

    // 3️⃣ Return combined result
    res.json({
      message: "Crop saved and prediction generated successfully",
      savedCrop: cropDoc,
      prediction, // this now contains ML response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error saving crop data or generating prediction",
      error: error.message,
    });
  }
});

// profile
// app.get("/api/profile", authMiddleware, async (req, res) => {
//   try {
//     const farmer = await farmerInfo
//       .findById(req.user.id)
//       .select("-password -confirmPassword");

//     if (!farmer) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json({ success: true, farmer });
//   } catch (err) {
//     console.error("Profile fetch error:", err);
//     res.status(500).json({ error: "Failed to fetch profile" });
//   }
// });

app.get('/api/profile', authMiddleware, async (req, res) => {
  try {
   
    const userId = req.user.id; // set in authMiddleware from JWT
    const user = await farmerInfo.findById(userId).lean();

    if (!user) return res.status(404).json({ error: "User not found" });

    // const crops = await cropInfo.find({ district: user.district }).lean();
    // or if you want exact ownership, you may save farmerId in cropInfo
    const crops = await cropInfo.find({ farmerId: userId }).lean();

    res.json({ success: true, user, crops });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Update own profile
app.put("/api/profile", authMiddleware, async (req, res) => {
  try {
    const { email, fullName } = req.body;

    const farmer = await farmerInfo.findById(req.user.id);
    if (!farmer) return res.status(404).json({ error: "User not found" });

    if (email) farmer.email = email;
    if (fullName) farmer.fullName = fullName;

    await farmer.save();

    res.json({ success: true, farmer });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});
// ========================
// 🔹 START SERVER
// ========================
app.listen(5000, () => console.log("Server running on port 5000"));
