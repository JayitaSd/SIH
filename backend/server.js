// // const express = require("express");
// // const mongoose = require("mongoose");
// // const bodyParser = require("body-parser");
// // const twilio = require("twilio");
// // const fetch = require("node-fetch");
// // require("dotenv").config();
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import twilio from "twilio";
// import fetch from "node-fetch";
// import farmerInfo from "./models/farmerInfo.js";
// import Notification from "./models/forecast_not.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const API_KEY = process.env.API_KEY;
// const MONGO_URI = process.env.MONGO_URI;

// // ========================
// // 🔹 Twilio setup
// // ========================
// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// //phone formatting
// function formatPhone(phone) {
//   let digits = phone.replace(/\D/g, "");
//   if (digits.startsWith("91")) {
//     digits = digits.substring(2);
//   }
//   return `+91${digits}`;
// }

// //  Translation helper
// async function translateWithMyMemory(text, lang) {
//   try {
//     if (lang === "en") return text;

//     let targetLang = "en|hi"; // default Hindi
//     if (lang === "mr") targetLang = "en|mr";
//     if (lang === "or") targetLang = "en|or";

//     const response = await fetch(
//       `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${targetLang}`
//     );
//     const data = await response.json();
//     return data.responseData.translatedText || text;
//   } catch (err) {
//     console.error("Translation error:", err);
//     return text;
//   }
// }

// // ========================
// // 🔹 MongoDB Connect
// // ========================
// mongoose
//   .connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true, // optional in newer versions
//   })
//   .then(() => console.log(" MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // ========================
// // 🔹 AUTH ROUTES
// // ========================

// // Register
// app.post("/api/register", async (req, res) => {
//   try {
//     const { email, phone, fullName, adminOrFarmer, password, confirmPassword } = req.body;

//     const formattedPhone = formatPhone(phone);

//     if (password !== confirmPassword) {
//       return res.status(400).json({ error: "Passwords do not match" });
//     }

//     const farmer = new farmerInfo({
//       email,
//       phone: formattedPhone,
//       fullName,
//       adminOrFarmer,
//       password,
//       confirmPassword,
//     });

//     await farmer.save();
//     res.json({ success: true, farmer });
//   } catch (err) {
//     console.error("Register error:", err);
//     res.status(500).json({ error: "Failed to register" });
//   }
// });

// // Login
// app.post("/api/login", async (req, res) => {
//   try {
//     const { phone, password } = req.body;
//     const formattedPhone = formatPhone(phone);

//     const farmer = await farmerInfo.findOne({ phone: formattedPhone });
//     if (!farmer || farmer.password !== password) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     res.json({ success: true, farmer });
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
//     if (!farmer) {
//       return res.status(404).json({ error: "Farmer not found" });
//     }

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
// // OTP ROUTES
// // ========================

// // Send OTP
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

// // Verify OTP
// // app.post("/api/verify-otp", async (req, res) => {
// //   try {
// //     const { phone, otp, code } = req.body;
// //     const formattedPhone = formatPhone(phone);

// //     const finalCode = code || otp;
// //     if (!finalCode) return res.status(400).json({ error: "OTP is required" });

// //     const verificationCheck = await client.verify.v2
// //       .services(process.env.TWILIO_VERIFY_SID)
// //       .verificationChecks.create({ to: formattedPhone, code: finalCode });

// //     if (verificationCheck.status === "approved") {
// //       res.json({ success: true, message: "OTP verified" });
// //     } else {
// //       res.status(400).json({ error: "Invalid OTP" });
// //     }
// //   } catch (err) {
// //     console.error("OTP verify error:", err);
// //     res.status(500).json({ error: "OTP verification failed" });
// //   }
// // });
// app.post("/api/verify-otp", async (req, res) => {
//   try {
//     const { phone, otp, code } = req.body;
//     const formattedPhone = formatPhone(phone);

//     const finalCode = code || otp;
//     if (!finalCode) return res.status(400).json({ error: "OTP is required" });

//     const verificationCheck = await client.verify.v2
//       .services(process.env.TWILIO_VERIFY_SID)
//       .verificationChecks.create({ to: formattedPhone, code: finalCode });
// console.log("Phone (verify):", formattedPhone);
// console.log("OTP received from frontend:", finalCode);
// console.log("Twilio Verify SID:", process.env.TWILIO_VERIFY_SID);

//     if (verificationCheck.status === "approved") {
//       res.json({ success: true, message: "OTP verified" });
//     } else {
//       res.status(400).json({ error: "Invalid OTP" });
//     }
//   } catch (err) {
//     // console.error("OTP verify error:", err);
//     console.error("OTP verify error details:", err.message, err);

//     res.status(500).json({ error: "OTP verification failed" });
//   }
// });

// // ========================
// // 🔹 WEATHER + ALERTS
// // ========================

// // Fetch weather + auto alerts
// app.get("/fetch-weather/:city", async (req, res) => {
//   const city = req.params.city;
//   const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     if (!data.list) return res.status(400).json({ error: data.message });

//     const dailyData = {};
//     data.list.forEach(item => {
//       const date = item.dt_txt.split(" ")[0];
//       if (!dailyData[date]) dailyData[date] = { temps: [], humidities: [], pressures: [], winds: [], descriptions: [] };
//       dailyData[date].temps.push(item.main.temp);
//       dailyData[date].humidities.push(item.main.humidity);
//       dailyData[date].pressures.push(item.main.pressure);
//       dailyData[date].winds.push(item.wind.speed);
//       dailyData[date].descriptions.push(item.weather[0].description);
//     });

//     let savedForecasts = [];
//     for (const date of Object.keys(dailyData).slice(0,5)) {
//       const d = dailyData[date];
//       const avg = arr => (arr.reduce((a,b)=>a+b,0)/arr.length).toFixed(1);
//       const summary = {
//         city,
//         date,
//         description: d.descriptions.sort((a,b)=>d.descriptions.filter(v=>v===a).length - d.descriptions.filter(v=>v===b).length).pop(),
//         temp: avg(d.temps),
//         humidity: avg(d.humidities),
//         pressure: avg(d.pressures),
//         wind: avg(d.winds)
//       };

//       const alertMsg = checkExtremeWeather(summary);
//       summary.alert = alertMsg;

//       savedForecasts.push(summary);

//       // Optionally send SMS alert in default English if extreme
//       if (alertMsg) {
//         await client.messages.create({
//           body: `Weather Alert for ${city} on ${date}: ${alertMsg}`,
//           from: "+12184299513",
//           to: numbers
//         });
//       }
//     }

//     res.json({ success: true, savedForecasts });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Route to send SMS with translation
// // app.post("/send-sms", async (req, res) => {
// //   const { alertMsg, city, date, lang } = req.body;

// //   try {
// //     const day = new Date(date).toLocaleDateString("en-US", { weekday: "long" });
// //     let baseMsg = `⚠️ Weather Alert for ${city} on ${date}: ${alertMsg}`;
// //     let finalMsg = baseMsg;

// //     if (lang && lang !== "en") {
// //       const langMap = { hi: "hi-IN", mr: "mr-IN", or: "or-IN" };
// //       finalMsg = await translateWithMyMemory(baseMsg, "en-GB", langMap[lang]);
// //     }

// //     const results = await Promise.all(
// //       numbers.map(num =>
// //         client.messages.create({
// //           body: finalMsg,
// //           from: "+12184299513",
// //           to: num
// //         })
// //       )
// //     );

// //     const notification = new Notification({
// //       city,
// //       alertMsg: finalMsg,
// //       date,
// //       day,
// //       recipients: numbers
// //     });
// //     await notification.save();

// //     res.json({ success: true, results, notification });
// //   } catch (err) {
// //     console.error("SMS Error:", err);
// //     res.status(500).json({ success: false, error: err.message });
// //   }
// // });
// app.post("/send-sms", async (req, res) => {
//   const { alertMsg, city, date, lang } = req.body;

//   try {
//     // 🔹 Get all farmers from DB
//     const farmers = await farmerInfo.find({}, "phone");
//     if (!farmers.length) {
//       return res.status(404).json({ success: false, error: "No farmers found in DB" });
//     }

//     const numbers = farmers.map(f => f.phone);

//     const day = new Date(date).toLocaleDateString("en-US", { weekday: "long" });
//     let baseMsg = `⚠️ Weather Alert for ${city} on ${date}: ${alertMsg}`;
//     let finalMsg = baseMsg;

//     // 🔹 Translate if needed
//     if (lang && lang !== "en") {
//       finalMsg = await translateWithMyMemory(baseMsg, lang);
//     }

//     // 🔹 Send SMS to all farmers
//     const results = await Promise.all(
//       numbers.map(num =>
//         client.messages.create({
//           body: finalMsg,
//           from: "+12184299513",  // use from .
//           to: num
//         })
//       )
//     );

//     // 🔹 Save notification log 
   
  
//     const notification = new Notification({
//       city,
//       alertMsg: finalMsg,
//       date,
//       day,
//       recipients: numbers
//     });
//     await notification.save();
    

//     res.json({ success: true, sentTo: numbers.length, results });
//   } catch (err) {
//     console.error("SMS Error:", err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });
// //ml integrate
// app.post("/predict", async (req, res) => {
//   const response = await fetch("http://localhost:3000/predict", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(req.body),
//   });

//   const prediction = await response.json();
//   res.json(prediction);
// });
// // ========================
// // 🔹 START SERVER
// // ========================
// app.listen(3000, () => console.log(" Server running on port 3000"));

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import twilio from "twilio";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import farmerInfo from "./models/farmerInfo.js";
import Notification from "./models/forecast_not.js";
import cropInfo from "./models/crops.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// ========================
// 🔹 Twilio setup
// ========================
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Phone formatting
function formatPhone(phone) {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("91")) {
    digits = digits.substring(2);
  }
  return `+91${digits}`;
}

// Translation helper
async function translateWithMyMemory(text, lang) {
  try {
    if (lang === "en") return text;

    let targetLang = "en|hi"; // default Hindi
    if (lang === "mr") targetLang = "en|mr";
    if (lang === "or") targetLang = "en|or";

    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=${targetLang}`
    );
    const data = await response.json();
    return data.responseData.translatedText || text;
  } catch (err) {
    console.error("Translation error:", err);
    return text;
  }
}

// ========================
// 🔹 MongoDB Connect
// ========================
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));



//pehla admin hoga ye pehla
async function makeAdmin() {
  await farmerInfo.updateOne(
    { phone: "+919503742187" },
    { $set: { role: "admin" } }
  );
  // console.log("Admin assigned successfully!");
}

makeAdmin();
// ========================
// 🔹 AUTH HELPERS
// ========================
function generateToken(farmer) {
  return jwt.sign(
    { id: farmer._id, role: farmer.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
}


function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Invalid token format" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid/Expired token" });
    req.user = decoded; // { id, role }
    next();
  });
}

function adminMiddleware(req, res, next) {
  if (req.user.role.toLowerCase() !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
}
app.post("/api/register", async (req, res) => {
   
  try {
    const { email, phone, fullName, password, confirmPassword } = req.body;
     console.log("Register request body:", req.body);
    const formattedPhone = formatPhone(phone);

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

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

    // Default role = farmer if not reserved before
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



// Login
app.post("/api/login", async (req, res) => {
  try {
    const { phone, password } = req.body;
    const formattedPhone = formatPhone(phone);

    const farmer = await farmerInfo.findOne({ phone: formattedPhone });
    if (!farmer || farmer.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

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
    if (!farmer) {
      return res.status(404).json({ error: "Farmer not found" });
    }

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

// Send OTP
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

// Verify OTP (single definition only)
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

// Add new admin phone (even if not registered yet)
app.post("/api/add-admin", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { phone } = req.body;
    const formattedPhone = formatPhone(phone);

    let farmer = await farmerInfo.findOne({ phone: formattedPhone });

    if (farmer) {
      // Already exists → upgrade to admin
      if (farmer.role === "admin") {
        return res.status(400).json({ error: "User is already an admin" });
      }
      farmer.role = "admin";
      await farmer.save();
    } else {
      // Doesn’t exist yet → reserve phone with admin role
      farmer = new farmerInfo({
        phone: formattedPhone,
        email: "", // can leave blank for now
        fullName: "",
        password: "", // can store dummy
        confirmPassword: "",
        role: "admin",
      });
      await farmer.save();
    }

    res.json({ success: true, message: `${formattedPhone} is now an admin` });
  } catch (err) {
    // console.error(error); // <--- This prints the actual error
    console.error("Add Admin Error:", err);
    res.status(500).json({ error: "Failed to add admin" });
  }
});


// ========================
// 🔹 WEATHER + ALERTS
// ========================
app.get("/api/fetch-weather/:city",authMiddleware,adminMiddleware, async (req, res) => {
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
        dailyData[date] = {
          temps: [],
          humidities: [],
          pressures: [],
          winds: [],
          descriptions: [],
        };
      dailyData[date].temps.push(item.main.temp);
      dailyData[date].humidities.push(item.main.humidity);
      dailyData[date].pressures.push(item.main.pressure);
      dailyData[date].winds.push(item.wind.speed);
      dailyData[date].descriptions.push(item.weather[0].description);
    });

    let savedForecasts = [];
    for (const date of Object.keys(dailyData).slice(0, 5)) {
      const d = dailyData[date];
      const avg = (arr) =>
        (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);
      const summary = {
        city,
        date,
        description: d.descriptions
          .sort(
            (a, b) =>
              d.descriptions.filter((v) => v === a).length -
              d.descriptions.filter((v) => v === b).length
          )
          .pop(),
        temp: avg(d.temps),
        humidity: avg(d.humidities),
        pressure: avg(d.pressures),
        wind: avg(d.winds),
      };

      // simple placeholder for extreme check
      const alertMsg =
        summary.temp > 40
          ? "Extreme Heat"
          : summary.temp < 5
          ? "Extreme Cold"
          : null;
      summary.alert = alertMsg;

      savedForecasts.push(summary);

      // Send SMS alerts if extreme
      if (alertMsg) {
        const farmers = await farmerInfo.find({}, "phone");
        const numbers = farmers.map((f) => f.phone);

        await Promise.all(
          numbers.map((num) =>
            client.messages.create({
              body: `Weather Alert for ${city} on ${date}: ${alertMsg}`,
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

// Route to send SMS with translation
app.post("/api/send-sms",authMiddleware,adminMiddleware, async (req, res) => {
  const { alertMsg, city, date, lang } = req.body;

  try {
    // 🔹 Get all farmers from DB
    const farmers = await farmerInfo.find({}, "phone");
    if (!farmers.length) {
      return res
        .status(404)
        .json({ success: false, error: "No farmers found in DB" });
    }

    // const numbers = farmers.map((f) => f.phone);
    const numbers = farmers.map((f) => formatPhone(f.phone));

    const day = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });
    let baseMsg = `⚠️ Weather Alert for ${city} on ${date}: ${alertMsg}`;
    let finalMsg = baseMsg;

    // 🔹 Translate if needed
    if (lang && lang !== "en") {
      finalMsg = await translateWithMyMemory(baseMsg, lang);
    }

    // 🔹 Send SMS to all farmers
    const results = await Promise.all(
      numbers.map((num) =>
        client.messages.create({
          body: finalMsg,
          from: "+16202548366",
          to: num,
        })
      )
    );

    // 🔹 Save notification log
    const notification = new Notification({
      city,
      alertMsg: finalMsg,
      date,
      day,
      recipients: numbers,
    });
    await notification.save();

    res.json({ success: true, sentTo: numbers.length, results });
  } catch (err) {
    console.error("SMS Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

//admin ke routes
// Get all admins
app.get("/api/admins", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const admins = await farmerInfo.find({ role: "admin" }).select("phone");
    // res.json({ success: true, admins });
    res.json(admins);
  } catch (err) {
    console.error("Fetch Admins Error:", err);
    res.status(500).json({ error: "Failed to fetch admins" });
  }
});

app.delete("/api/admins/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid admin ID" });
    }

    const farmer = await farmerInfo.findById(id);

    if (!farmer) return res.status(404).json({ error: "Admin not found" });

    farmer.role = "farmer"; // demote back
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid admin ID" });
    }

    const farmer = await farmerInfo.findById(id);
    if (!farmer) return res.status(404).json({ error: "Admin not found" });

    // Update the phone
    farmer.phone = formatPhone(newPhone);
    await farmer.save();

    res.json({ success: true, message: `Phone updated to ${farmer.phone}` });
  } catch (err) {
    console.error("Update Admin Error:", err);
    res.status(500).json({ error: "Failed to update admin" });
  }
});


//ml integrate
app.post("/api/predict", async (req, res) => {
  try {
    // Send data to Python ML API
    const response = await axios.post("http://localhost:5001/predict", req.body);

    res.json(response.data); // forward prediction to Angular
  } catch (error) {
    res.status(500).json({ error: "ML prediction failed", details: error.message });
  }
});

// crops

app.post("/api/crops", async (req, res) => {
  console.log("Received body:", req.body);
  try {
    const {
      district,
      crop,
      season,
      area,
      fertilizerUse,
      pesticideUse,
      temp,
      humidity,
      n,
      p,
      k,
      pH
    } = req.body;

    // Create document explicitly
    const cropDoc = new cropInfo({
      district,
      crop,
      season,
      area,
      fertilizerUse,
      pesticideUse,
      temp,
      humidity,
      n,
      p,
      k,
      pH
    });

    await cropDoc.save();
    res.status(201).json({ message: "Crop data saved successfully", crop: cropDoc });
  } catch (error) {
    res.status(400).json({ message: "Error saving crop data", error });
  }
});

// ========================
// 🔹 START SERVER
// ========================
app.listen(3000, () => console.log(" Server running on port 3000"));