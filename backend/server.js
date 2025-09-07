// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const twilio = require("twilio");
// const fetch = require("node-fetch");
// require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import twilio from "twilio";
import fetch from "node-fetch";
import farmerInfo from "./models/farmerInfo.js";
import Notification from "./models/forecast_not.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;
const MONGO_URI = process.env.MONGO_URI;

// ========================
// 🔹 Twilio setup
// ========================
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

//phone formatting
function formatPhone(phone) {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("91")) {
    digits = digits.substring(2);
  }
  return `+91${digits}`;
}

//  Translation helper
async function translateWithMyMemory(text, lang) {
  try {
    if (lang === "en") return text;

    let targetLang = "en|hi"; // default Hindi
    if (lang === "mr") targetLang = "en|mr";
    if (lang === "or") targetLang = "en|or";

    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${targetLang}`
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
    useUnifiedTopology: true, // optional in newer versions
  })
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ========================
// 🔹 AUTH ROUTES
// ========================

// Register
app.post("/api/register", async (req, res) => {
  try {
    const { email, phone, fullName, adminOrFarmer, password, confirmPassword } = req.body;

    const formattedPhone = formatPhone(phone);

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const farmer = new farmerInfo({
      email,
      phone: formattedPhone,
      fullName,
      adminOrFarmer,
      password,
      confirmPassword,
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

    res.json({ success: true, farmer });
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
// OTP ROUTES
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

// Verify OTP
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
app.post("/api/verify-otp", async (req, res) => {
  try {
    const { phone, otp, code } = req.body;
    const formattedPhone = formatPhone(phone);

    const finalCode = code || otp;
    if (!finalCode) return res.status(400).json({ error: "OTP is required" });

    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verificationChecks.create({ to: formattedPhone, code: finalCode });
console.log("Phone (verify):", formattedPhone);
console.log("OTP received from frontend:", finalCode);
console.log("Twilio Verify SID:", process.env.TWILIO_VERIFY_SID);

    if (verificationCheck.status === "approved") {
      res.json({ success: true, message: "OTP verified" });
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (err) {
    // console.error("OTP verify error:", err);
    console.error("OTP verify error details:", err.message, err);

    res.status(500).json({ error: "OTP verification failed" });
  }
});

// ========================
// 🔹 WEATHER + ALERTS
// ========================

// Fetch weather + auto alerts
app.get("/fetch-weather/:city", async (req, res) => {
  const city = req.params.city;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!data.list) return res.status(400).json({ error: data.message });

    const dailyData = {};
    data.list.forEach(item => {
      const date = item.dt_txt.split(" ")[0];
      if (!dailyData[date]) dailyData[date] = { temps: [], humidities: [], pressures: [], winds: [], descriptions: [] };
      dailyData[date].temps.push(item.main.temp);
      dailyData[date].humidities.push(item.main.humidity);
      dailyData[date].pressures.push(item.main.pressure);
      dailyData[date].winds.push(item.wind.speed);
      dailyData[date].descriptions.push(item.weather[0].description);
    });

    let savedForecasts = [];
    for (const date of Object.keys(dailyData).slice(0,5)) {
      const d = dailyData[date];
      const avg = arr => (arr.reduce((a,b)=>a+b,0)/arr.length).toFixed(1);
      const summary = {
        city,
        date,
        description: d.descriptions.sort((a,b)=>d.descriptions.filter(v=>v===a).length - d.descriptions.filter(v=>v===b).length).pop(),
        temp: avg(d.temps),
        humidity: avg(d.humidities),
        pressure: avg(d.pressures),
        wind: avg(d.winds)
      };

      const alertMsg = checkExtremeWeather(summary);
      summary.alert = alertMsg;

      savedForecasts.push(summary);

      // Optionally send SMS alert in default English if extreme
      if (alertMsg) {
        await client.messages.create({
          body: `Weather Alert for ${city} on ${date}: ${alertMsg}`,
          from: "+12184299513",
          to: numbers
        });
      }
    }

    res.json({ success: true, savedForecasts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to send SMS with translation
// app.post("/send-sms", async (req, res) => {
//   const { alertMsg, city, date, lang } = req.body;

//   try {
//     const day = new Date(date).toLocaleDateString("en-US", { weekday: "long" });
//     let baseMsg = `⚠️ Weather Alert for ${city} on ${date}: ${alertMsg}`;
//     let finalMsg = baseMsg;

//     if (lang && lang !== "en") {
//       const langMap = { hi: "hi-IN", mr: "mr-IN", or: "or-IN" };
//       finalMsg = await translateWithMyMemory(baseMsg, "en-GB", langMap[lang]);
//     }

//     const results = await Promise.all(
//       numbers.map(num =>
//         client.messages.create({
//           body: finalMsg,
//           from: "+12184299513",
//           to: num
//         })
//       )
//     );

//     const notification = new Notification({
//       city,
//       alertMsg: finalMsg,
//       date,
//       day,
//       recipients: numbers
//     });
//     await notification.save();

//     res.json({ success: true, results, notification });
//   } catch (err) {
//     console.error("SMS Error:", err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });
app.post("/send-sms", async (req, res) => {
  const { alertMsg, city, date, lang } = req.body;

  try {
    // 🔹 Get all farmers from DB
    const farmers = await farmerInfo.find({}, "phone");
    if (!farmers.length) {
      return res.status(404).json({ success: false, error: "No farmers found in DB" });
    }

    const numbers = farmers.map(f => f.phone);

    const day = new Date(date).toLocaleDateString("en-US", { weekday: "long" });
    let baseMsg = `⚠️ Weather Alert for ${city} on ${date}: ${alertMsg}`;
    let finalMsg = baseMsg;

    // 🔹 Translate if needed
    if (lang && lang !== "en") {
      finalMsg = await translateWithMyMemory(baseMsg, lang);
    }

    // 🔹 Send SMS to all farmers
    const results = await Promise.all(
      numbers.map(num =>
        client.messages.create({
          body: finalMsg,
          from: "+12184299513",  // use from .
          to: num
        })
      )
    );

    // 🔹 Save notification log 
   
  
    const notification = new Notification({
      city,
      alertMsg: finalMsg,
      date,
      day,
      recipients: numbers
    });
    await notification.save();
    

    res.json({ success: true, sentTo: numbers.length, results });
  } catch (err) {
    console.error("SMS Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ========================
// 🔹 START SERVER
// ========================
app.listen(3000, () => console.log(" Server running on port 3000"));
