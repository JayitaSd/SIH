# import copy
# from fastapi import FastAPI, Request
# from pydantic import BaseModel
# import joblib
# import pandas as pd
# import json
# import os

# # ============================
# # 1. Load model & defaults
# # ============================
# MODEL_PATH = os.path.join(os.path.dirname(__file__), "farm_yield_pipeline.pkl")
# model = joblib.load(MODEL_PATH)

# with open("district_defaults.json") as f:
#     district_defaults_raw = json.load(f)

# with open("crop_prices.json") as f:
#     crop_prices_raw = json.load(f)

# with open("recommend.json") as f:
#     recommended_values = json.load(f)

# # Normalize district defaults and crop prices
# district_defaults = {k.strip().lower(): {kk.strip(): vv for kk, vv in v.items()}
#                      for k, v in district_defaults_raw.items()}
# crop_prices = {k.strip().lower(): v for k, v in crop_prices_raw.items()}

# # ============================
# # 2. Init FastAPI
# # ============================
# app = FastAPI(title="Farm Yield Prediction API")

# # ============================
# # 3. Input Model
# # ============================
# class PredictRequest(BaseModel):
#     district: str
#     crop_name: str
#     sown_area: float
#     season_of_cultivation: str | None = None
#     soil_n: float | None = None
#     soil_p: float | None = None
#     soil_k: float | None = None
#     soil_ph: float | None = None
#     fertilizer_use_kg_ha: float | None = None
#     pesticide_use_kg_ha: float | None = None
#     avg_temperature: float | None = None
#     avg_humidity: float | None = None

# # ============================
# # 4. Home route
# # ============================
# @app.get("/")
# def home():
#     return {"status": "ok", "message": "🌾 Farm Yield Prediction API is running!"}

# # ============================
# # 5. Prediction route
# # ============================
# @app.post("/predict")
# async def predict(req: PredictRequest):
#     try:
#         payload = req.dict()
#         district = payload["district"].strip().lower()
#         crop_name = payload["crop_name"].strip().lower()
#         sown_area = float(payload["sown_area"])

#         # Fill missing values from district defaults
#         if district in district_defaults:
#             defaults = district_defaults[district]
#             for key in ["soil n", "soil p", "soil k", "soil ph",
#                         "fertilizer use (kg/ha)", "pesticide use (kg/ha)",
#                         "avg temperature", "avg humidity"]:
#                 camel_key = key.replace(" ", "_").replace("(kg/ha)", "kg_ha")
#                 if camel_key in payload and payload[camel_key] is not None:
#                     continue
#                 payload[camel_key] = defaults.get(key, 0)

#         # Required columns for model
#         required_columns = [
#             'District', 'Crop name', 'Season of cultivation', 'Sown area',
#             'Fertilizer use (kg/ha)', 'Pesticide use (kg/ha)',
#             'Avg temperature', 'Avg humidity', 'Soil N', 'Soil P', 'Soil K', 'Soil pH'
#         ]

#         df_dict = {}
#         for col in required_columns:
#             lower_col = col.lower().replace(" ", "_").replace("(kg/ha)", "kg_ha")
#             if lower_col in payload and payload[lower_col] is not None:
#                 df_dict[col] = [payload[lower_col]]
#             else:
#                 if col in ["District", "Crop name", "Season of cultivation"]:
#                     df_dict[col] = [""]
#                 else:
#                     df_dict[col] = [0]

#         df = pd.DataFrame(df_dict)

#         # ============================
#         # Predict yield
#         # ============================
#         predicted_yield = float(model.predict(df)[0])

#         # Search recommended values
#         def search_record(district, crop):
#             for record in recommended_values:
#                 if (record["District"].lower() == district
#                         and record["Crop name"].lower() == crop):
#                     return record
#             return None

#         result = search_record(district, crop_name)

#         # Calculate revenue
#         expected_revenue = None
#         if crop_name in crop_prices:
#             price_per_tonne = float(crop_prices[crop_name])
#             expected_revenue = predicted_yield * sown_area * price_per_tonne

#         optimal_yield_possible = result["Optimal Yield"] if result else None
#         percent_increase_in_yield = None
#         if optimal_yield_possible and predicted_yield > 0:
#             percent_increase_in_yield = (optimal_yield_possible - predicted_yield) * 100 / predicted_yield

#         optimal_revenue = None
#         if crop_name in crop_prices:
#             price_per_tonne = float(crop_prices[crop_name])
#             optimal_revenue = optimal_yield_possible * sown_area * price_per_tonne

#         # Fertilizer recommendations
#         bp = {
#             'N': {'low': 0, 'low_up': 240, 'med_up': 480, 'high_up': 700},
#             'P': {'low': 0, 'low_up': 11, 'med_up': 22, 'high_up': 44},
#             'K': {'low': 0, 'low_up': 110, 'med_up': 280, 'high_up': 560}
#         }

#         def from_index(index, nutrient):
#             b = bp[nutrient]
#             if pd.isna(index):
#                 return None
#             idx = float(index)
#             if idx <= 25:
#                 return b['low'] + (idx/25) * (b['low_up'] - b['low'])
#             elif idx <= 50:
#                 return b['low_up'] + ((idx-25)/25) * (b['med_up'] - b['low_up'])
#             elif idx <= 75:
#                 return b['med_up'] + ((idx-50)/25) * (b['high_up'] - b['med_up'])
#             else:
#                 cap = b['high_up'] * 2
#                 return b['high_up'] + ((idx-75)/25) * (cap - b['high_up'])

#         n_kg_ha_to_be_added = max(0, from_index((result['Soil N'] - payload["soil_n"]), 'N')) 
#         p_kg_ha_to_be_added = max(0, from_index((result['Soil P'] - payload["soil_p"]), 'P')) 
#         k_kg_ha_to_be_added = max(0, from_index((result['Soil K'] - payload["soil_k"]), 'K')) 


#         best_crop_by_revenue = ""
#         best_crop_by_yield = ""
#         best_yield = 0
#         current_revenue_best_revenue = 0
#         current_revenue_best_yield = 0
#         df_dict1 = copy.deepcopy(df_dict)
#         for i in list(crop_prices.keys()):
#             df_dict1['Crop name'] = i
#             df1 = pd.DataFrame(df_dict1)
#             yield1 = float(model.predict(df1)[0])
#             price_per_tonne = float(crop_prices[i.lower()])
#             revenue1 = yield1 * sown_area * price_per_tonne
#             if current_revenue_best_revenue < revenue1:
#                 best_crop_by_revenue = i
#                 current_revenue_best_revenue = revenue1
#             if  best_yield < yield1:
#                 best_crop_by_yield = i
#                 best_yield = yield1
#                 current_revenue_best_yield = revenue1

#         def recommend_irrigation(t, h):
           
#             if (h < 50) or (t >= 32):
#                 return ("Drip, High (daily/alternate-day)")
#             if (h >= 75) and (t <= 25):
#                 return ("Surface, Low (weekly/bi-weekly)")
#             return ("Sprinkler, Moderate (every 3-6 days)")

#         recs = recommend_irrigation(payload["avg_temperature"],payload['avg_humidity'])


#         return {
#             "prediction_tonnes_per_ha": round(predicted_yield,5),
#             "expected_revenue": round(expected_revenue),
#             "optimal_yield_possible": optimal_yield_possible,
#             "optimal_revenue": round(optimal_revenue),
#             "revenue_increase": max(0,round(optimal_revenue)-round(expected_revenue)),
#             "percent_increase_in_yield": round(percent_increase_in_yield,2),
#             "best_crop_by_revenue": best_crop_by_revenue,
#             "revenue_increase_from_best_crop_by_revenue": max(0, round(current_revenue_best_revenue-expected_revenue)),
#             "best_crop_by_yield": best_crop_by_yield,
#             "revenue_increase_from_best_crop_by_yield": max(0, round(current_revenue_best_yield-expected_revenue)),
#             "n_kg_ha_to_be_added": round(n_kg_ha_to_be_added,2),
#             "p_kg_ha_to_be_added": round(p_kg_ha_to_be_added,2),
#             "k_kg_ha_to_be_added": round(k_kg_ha_to_be_added,2),
#             "pH_recommended": round(result['Soil pH'],1) if result else None,
#             "fertilizer_value_recommended_kg_ha": result['Fertilizer use (kg/ha)'] if result else None,
#             "pesticide_value_recommended_kg_ha": result['Pesticide use (kg/ha)'] if result else None,
#             "recommend_irrigation": recs
#         }

#     except Exception as e:
#         return {"error": str(e)}

import copy
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import json
import os

# ============================
# 1. Load model & defaults
# ============================
MODEL_PATH = os.path.join(os.path.dirname(__file__), "farm_yield_pipeline.pkl")
model = joblib.load(MODEL_PATH)

with open("district_defaults.json") as f:
    district_defaults_raw = json.load(f)

with open("crop_prices.json") as f:
    crop_prices_raw = json.load(f)

with open("recommend.json") as f:
    recommended_values = json.load(f)

# Normalize district defaults and crop prices
district_defaults = {k.strip().lower(): {kk.strip(): vv for kk, vv in v.items()}
                     for k, v in district_defaults_raw.items()}
crop_prices = {k.strip().lower(): v for k, v in crop_prices_raw.items()}

# ============================
# 2. Init FastAPI + CORS
# ============================
app = FastAPI(title="Farm Yield Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================
# 3. Input Model
# ============================
class PredictRequest(BaseModel):
    district: str
    crop_name: str
    sown_area: float
    season_of_cultivation: str | None = None
    soil_n: float | None = None
    soil_p: float | None = None
    soil_k: float | None = None
    soil_ph: float | None = None
    fertilizer_use_kg_ha: float | None = None
    pesticide_use_kg_ha: float | None = None
    avg_temperature: float | None = None
    avg_humidity: float | None = None

# ============================
# 4. Home route
# ============================
@app.get("/")
def home():
    return {"status": "ok", "message": "🌾 Farm Yield Prediction API is running!"}

# ============================
# 5. Prediction route
# ============================
@app.post("/predict")
async def predict(req: PredictRequest):
    try:
        payload = req.dict()
        district = payload["district"].strip().lower()
        crop_name = payload["crop_name"].strip().lower()
        sown_area = float(payload["sown_area"])

        # Fill missing values from district defaults
        if district in district_defaults:
            defaults = district_defaults[district]
            for key in ["soil n", "soil p", "soil k", "soil ph",
                        "fertilizer use (kg/ha)", "pesticide use (kg/ha)",
                        "avg temperature", "avg humidity"]:
                camel_key = key.replace(" ", "_").replace("(kg/ha)", "kg_ha")
                if camel_key in payload and payload[camel_key] is not None:
                    continue
                payload[camel_key] = defaults.get(key, 0)

        # Required columns for model
        required_columns = [
            'District', 'Crop name', 'Season of cultivation', 'Sown area',
            'Fertilizer use (kg/ha)', 'Pesticide use (kg/ha)',
            'Avg temperature', 'Avg humidity', 'Soil N', 'Soil P', 'Soil K', 'Soil pH'
        ]

        df_dict = {}
        for col in required_columns:
            lower_col = col.lower().replace(" ", "_").replace("(kg/ha)", "kg_ha")
            if lower_col in payload and payload[lower_col] is not None:
                df_dict[col] = [payload[lower_col]]
            else:
                if col in ["District", "Crop name", "Season of cultivation"]:
                    df_dict[col] = [""]
                else:
                    df_dict[col] = [0]

        df = pd.DataFrame(df_dict)

        # ============================
        # Predict yield
        # ============================
        predicted_yield = float(model.predict(df)[0])

        # Search recommended values
        def search_record(district, crop):
            for record in recommended_values:
                if (record["District"].lower() == district
                        and record["Crop name"].lower() == crop):
                    return record
            return None

        result = search_record(district, crop_name)

        # Calculate revenue
        expected_revenue = None
        if crop_name in crop_prices:
            price_per_tonne = float(crop_prices[crop_name])
            expected_revenue = predicted_yield * sown_area * price_per_tonne

        optimal_yield_possible = result["Optimal Yield"] if result else None
        percent_increase_in_yield = None
        if optimal_yield_possible and predicted_yield > 0:
            percent_increase_in_yield = (optimal_yield_possible - predicted_yield) * 100 / predicted_yield

        optimal_revenue = None
        if crop_name in crop_prices:
            price_per_tonne = float(crop_prices[crop_name])
            optimal_revenue = optimal_yield_possible * sown_area * price_per_tonne

        # Fertilizer recommendations
        bp = {
            'N': {'low': 0, 'low_up': 240, 'med_up': 480, 'high_up': 700},
            'P': {'low': 0, 'low_up': 11, 'med_up': 22, 'high_up': 44},
            'K': {'low': 0, 'low_up': 110, 'med_up': 280, 'high_up': 560}
        }

        def from_index(index, nutrient):
            b = bp[nutrient]
            if pd.isna(index):
                return None
            idx = float(index)
            if idx <= 25:
                return b['low'] + (idx/25) * (b['low_up'] - b['low'])
            elif idx <= 50:
                return b['low_up'] + ((idx-25)/25) * (b['med_up'] - b['low_up'])
            elif idx <= 75:
                return b['med_up'] + ((idx-50)/25) * (b['high_up'] - b['med_up'])
            else:
                cap = b['high_up'] * 2
                return b['high_up'] + ((idx-75)/25) * (cap - b['high_up'])

        n_kg_ha_to_be_added = max(0, from_index((result['Soil N'] - payload["soil_n"]), 'N')) 
        p_kg_ha_to_be_added = max(0, from_index((result['Soil P'] - payload["soil_p"]), 'P')) 
        k_kg_ha_to_be_added = max(0, from_index((result['Soil K'] - payload["soil_k"]), 'K')) 

        best_crop_by_revenue = ""
        best_crop_by_yield = ""
        best_yield = 0
        current_revenue_best_revenue = 0
        current_revenue_best_yield = 0
        df_dict1 = copy.deepcopy(df_dict)
        for i in list(crop_prices.keys()):
            df_dict1['Crop name'] = i
            df1 = pd.DataFrame(df_dict1)
            yield1 = float(model.predict(df1)[0])
            price_per_tonne = float(crop_prices[i.lower()])
            revenue1 = yield1 * sown_area * price_per_tonne
            if current_revenue_best_revenue < revenue1:
                best_crop_by_revenue = i
                current_revenue_best_revenue = revenue1
            if best_yield < yield1:
                best_crop_by_yield = i
                best_yield = yield1
                current_revenue_best_yield = revenue1

        def recommend_irrigation(t, h):
            if (h < 50) or (t >= 32):
                return "Drip, High (daily/alternate-day)"
            if (h >= 75) and (t <= 25):
                return "Surface, Low (weekly/bi-weekly)"
            return "Sprinkler, Moderate (every 3-6 days)"

        recs = recommend_irrigation(payload["avg_temperature"], payload['avg_humidity'])

        return {
            "prediction_tonnes_per_ha": round(predicted_yield, 5),
            "expected_revenue": round(expected_revenue) if expected_revenue else None,
            "optimal_yield_possible": optimal_yield_possible,
            "optimal_revenue": round(optimal_revenue) if optimal_revenue else None,
            "revenue_increase": max(0, round(optimal_revenue) - round(expected_revenue)) if expected_revenue and optimal_revenue else None,
            "percent_increase_in_yield": round(percent_increase_in_yield, 2) if percent_increase_in_yield else None,
            "best_crop_by_revenue": best_crop_by_revenue,
            "revenue_increase_from_best_crop_by_revenue": max(0, round(current_revenue_best_revenue - expected_revenue)) if expected_revenue else None,
            "best_crop_by_yield": best_crop_by_yield,
            "revenue_increase_from_best_crop_by_yield": max(0, round(current_revenue_best_yield - expected_revenue)) if expected_revenue else None,
            "n_kg_ha_to_be_added": round(n_kg_ha_to_be_added, 2),
            "p_kg_ha_to_be_added": round(p_kg_ha_to_be_added, 2),
            "k_kg_ha_to_be_added": round(k_kg_ha_to_be_added, 2),
            "pH_recommended": round(result['Soil pH'], 1) if result else None,
            "fertilizer_value_recommended_kg_ha": result['Fertilizer use (kg/ha)'] if result else None,
            "pesticide_value_recommended_kg_ha": result['Pesticide use (kg/ha)'] if result else None,
            "recommend_irrigation": recs
        }

    except Exception as e:
        return {"error": str(e)}

# ============================
# 6. Run with Uvicorn
# ============================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=5001, reload=True)
