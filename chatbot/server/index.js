import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";
import * as franc from "franc";

import districtData from "../src/districtData.js";
import schemes from "../src/schemes.js";

dotenv.config();

const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

console.log(`${process.env.OPENROUTER_API_KEY}`);
function detectLanguage(text) {
  if (!text || typeof text !== "string") return "english";

  
  const odiaRegex = /[\u0B00-\u0B7F]/;
  if (odiaRegex.test(text)) return "odia";

 
  const langCode = franc.franc(text, { minLength: 3 });
  return langCode === "ory" ? "odia" : "english";
}



const odiaToEnglishDistrict = {
  ଅଂଗୁଳ: "Angul",
  ବଲାଙ୍ଗିର: "Balangir",
  ବରଗଡ: "Bargarh",
  ଦେଓଗଡ: "Deogarh",
  ଧେନକାନାଲ: "Dhenkanal",
  ଝାରସୁଗୁଡା: "Jharsuguda",
  କେନ୍ଦୁଝର: "Kendujhar",
  ସମ୍ବଲପୁର: "Sambalpur",
  ସୁବର୍ଣ୍ଣପୁର: "Subarnapur",
  ସୁନ୍ଦରଗଡ: "Sundargarh",
  ବଲାସୋର: "Balasore",
  ଭଦ୍ରକ: "Bhadrak",
  କଟକ: "Cuttack",
  ଜଗତସିଂହପୁର: "Jagatsinghpur",
  ଜଜପୁର: "Jajpur",
  କେନ୍ଦ୍ରପଡା: "Kendrapada",
  ଖୋର୍ଦ୍ଧା: "Khordha",
  ମୟୂରଭଞ୍ଜ: "Mayurbhanj",
  ନୟାଗଡ: "Nayagarh",
  ପୁରୀ: "Puri",
  ବୌଦ୍ଧ: "Boudh",
  ଗଜପତି: "Gajapati",
  ଗଞ୍ଜାମ: "Ganjam",
  କଳାହାଣ୍ଡି: "Kalahandi",
  କନ୍ଧମାଳ: "Kandhamal",
  କୋରାପୁଟ: "Koraput",
  ମଲ୍କାଙ୍ଗିରି: "Malkangiri",
  ନବରଙ୍ଗପୁର: "Nabarangpur",
  ନୁଆପଡା: "Nuapada",
  ରାୟଗଡ: "Rayagada",
};

const odiaToEnglishScheme = {
  "ପିଏମ-କିସାନ ସମ୍ମାନ ନିଧି": "PM-Kisan Samman Nidhi",
  "ପ୍ରଧାନମନ୍ତ୍ରୀ ଫସଲ ବୀମା ଯୋଜନା": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
  "କିସାନ କ୍ରେଡିଟ କାର୍ଡ (କେସିସି) ଯୋଜନା": "Kisan Credit Card (KCC) Scheme",
  "ମୃଦା ସ୍ୱାସ୍ଥ୍ୟ କାର୍ଡ ଯୋଜନା": "Soil Health Card Scheme",
  "କୃଷି ଅବକାଶ ଧନ ଯୋଜନା": "Agriculture Infrastructure Fund (AIF)",
  "ରାଷ୍ଟ୍ରୀୟ ପ୍ରକୃତିକୃଷି ମିଶନ": "National Mission on Natural Farming (NMNF)",
  "ଅଟଳ ଭୁଜଳ ଯୋଜନା": "Atal Bhujal Yojana",
  "ଗ୍ରାମୀଣ ଭଣ୍ଡାରଣ ଯୋଜନା": "Gramin Bhandaran Yojana",
  "ପ୍ରଧାନମନ୍ତ୍ରୀ ମାତ୍ସ୍ୟ ସମ୍ପଦା ଯୋଜନା":
    "Pradhan Mantri Matsya Sampada Yojana (PMMSY)",
  "କ୍ଲିନ୍ ପ୍ଲାଣ୍ଟ ପ୍ରକଳ୍ପ": "Clean Plant Project",
  "ନ୍ୟୁନତମ ସମର୍ଥନ ମୂଲ୍ୟ ଓ କ୍ରୟ ସମର୍ଥନ":
    "Minimum Support Price (MSP) & procurement support",
  "ଇଥାନଲ୍ ବ୍ଲେଣ୍ଡ ପେଟ୍ରୋଲ୍ (EBP) ପ୍ରକଳ୍ପ":
    "Ethanol Blended Petrol (EBP) Programme",
  "ସ୍ୱାମିତ୍ୱ ଯୋଜନା": "Svamitva Yojana",
  "ପ୍ରଧାନମନ୍ତ୍ରୀ କିସାନ ଉର୍ଜା ସୁରକ୍ଷା ଏବଂ ଉଦ୍ଧାନ ମହାଭିୟାନ":
    "Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan (PM-KUSUM)",
  "ପରମ୍ପରାଗତ କୃଷି ବିକାଶ ଯୋଜନା": "Paramparagat Krishi Vikas Yojana (PKVY)",
  "ରାଷ୍ଟ୍ରୀୟ କୃଷି ବିକାଶ ଯୋଜନା (RKVY-RAFTAAR)":
    "Rashtriya Krishi Vikas Yojana (RKVY-RAFTAAR)",
};


function getRelevantData(userInput) {
  const results = [];
  const lowerMsg = userInput.toLowerCase();

  
  districtData.forEach((district) => {
    const districtNames = [district.district.toLowerCase()];
  
    for (const [odia, eng] of Object.entries(odiaToEnglishDistrict)) {
      if (eng.toLowerCase() === district.district.toLowerCase()) {
        districtNames.push(odia);
      }
    }

    
    if (districtNames.some((name) => userInput.includes(name))) {
      results.push({
        type: "district",
        name: district.district,
        data: district,
      });
    }

    for (const [cropName, cropData] of Object.entries(district.crops)) {
      if (
        districtNames.some((name) => userInput.includes(name)) &&
        lowerMsg.includes(cropName)
      ) {
        results.push({
          type: "district+crop",
          district: district.district,
          crop: cropName,
          data: cropData,
        });
      }
    }
  });

 
  schemes.forEach((scheme) => {
    const engName = scheme.title.toLowerCase();
    let matched = lowerMsg.includes(engName);

    for (const [odiaName, englishName] of Object.entries(odiaToEnglishScheme)) {
      if (
        userInput.includes(odiaName) &&
        englishName.toLowerCase() === engName
      ) {
        matched = true;
        break;
      }
    }

    if (matched) {
      results.push({
        type: "scheme",
        name: scheme.title,
        data: scheme.description,
        link: scheme.link,
      });
    }
  });

  return results;
}


async function chatbot(userInput) {
  const language = detectLanguage(userInput);
  const relevantItems = getRelevantData(userInput);


  const fallbackMsgOdia =
    "ମୁଁ କେବଳ ଓଡିଶାର କୃଷି ତଥ୍ୟ ଉପରେ ଆଧାରିତ ପ୍ରଶ୍ନଗୁଡିକୁ ଉତ୍ତର ଦେଇପାରିବି।";
  const fallbackMsgEnglish =
    "Sorry, I can only answer based on Odisha farming data.";
  const fallbackMsg =
    language === "odia" ? fallbackMsgOdia : fallbackMsgEnglish;

  
  if (!relevantItems.length) {
    return fallbackMsg;
  }

  
  const dataText = relevantItems
    .map((item) => {
      if (item.type === "district") {
        return `${item.name} District:
Soil: ${item.data.soil.join(", ")}
Irrigation: ${item.data.irrigation.join(", ")}
Fertilizers: ${item.data.fertilizers.join(", ")}
Pesticides: ${item.data.pesticides.join(", ")}`;
      }
      if (item.type === "district+crop") {
        return `${item.crop} in ${item.district}:
Fertilizers: ${item.data.fertilizers.join(", ")}
Pesticides: ${item.data.pesticides.join(", ")}
Irrigation: ${item.data.irrigation.join(", ")}`;
      }
      if (item.type === "scheme") {
        return `Scheme: ${item.name}
Details: ${item.data}
More info: ${item.link}`;
      }
    })
    .join("\n\n");

  const systemPrompt = `
You are a chatbot for the Government of Odisha Agriculture Department.
You can ONLY use the following data to answer:

${dataText}

Rules:
- If the query is not related to this data, reply exactly: "${fallbackMsg}"
- Always reply in the language of the user input.
- If multiple items are found, answer each clearly and separately.
`;

  const completion = await openrouter.chat.completions.create({
    model: "deepseek/deepseek-chat",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userInput },
    ],
  });

  return completion.choices[0]?.message?.content || fallbackMsg;
}


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body?.message;
    if (!userMessage || typeof userMessage !== "string") {
      return res.json({ reply: "Invalid input." });
    }

    const reply = await chatbot(userMessage);
    res.json({ reply });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () =>
  console.log("Chatbot running successfully on http://localhost:3000")
);
