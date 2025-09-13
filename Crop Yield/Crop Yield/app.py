from flask import Flask, request, jsonify
import joblib
import pandas as pd
import json

# ============================
# 1. Load model & defaults
# ============================
model = joblib.load("farm_yield_pipeline.pkl")

with open("district_defaults.json") as f:
    district_defaults_raw = json.load(f)

with open("crop_prices.json") as f:
    crop_prices_raw = json.load(f)

# Normalize district defaults and crop prices to lowercase keys
district_defaults = {k.strip().lower(): {kk.strip(): vv for kk, vv in v.items()} 
                     for k, v in district_defaults_raw.items()}
crop_prices = {k.strip().lower(): v for k, v in crop_prices_raw.items()}

app = Flask(__name__)

# ============================
# 2. Home route
# ============================
@app.route("/")
def home():
    return "🌾 Farm Yield Prediction API is running!"

# ============================
# 3. Prediction route
# ============================
@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Normalize incoming keys to lowercase
        payload = {k.lower(): v for k, v in request.get_json().items()}

        # Required keys
        if "district" not in payload or "crop name" not in payload or "sown area" not in payload:
            return jsonify({"error": "district, crop name, and sown area are required"}), 400

        district = payload["district"].strip().lower()
        crop_name = payload["crop name"].strip().lower()
        try:
            sown_area = float(payload["sown area"])
        except:
            return jsonify({"error": "sown area must be numeric"}), 400

        # Fill missing soil/fertilizer/pesticide/temperature/humidity from district defaults
        if district in district_defaults:
            defaults = district_defaults[district]
            for key in ["soil n", "soil p", "soil k", "soil ph",
                        "fertilizer use (kg/ha)", "pesticide use (kg/ha)",
                        "avg temperature", "avg humidity"]:
                if key not in payload or payload[key] is None:
                    payload[key] = defaults.get(key, 0)

        # ============================
        # Ensure all required columns exist
        # ============================
        required_columns = [
            'District', 'Crop name', 'Season of cultivation', 'Sown area',
            'Fertilizer use (kg/ha)', 'Pesticide use (kg/ha)',
            'Avg temperature', 'Avg humidity', 'Soil N', 'Soil P', 'Soil K', 'Soil pH'
        ]

        df_dict = {}
        for col in required_columns:
            lower_col = col.lower()
            if lower_col in payload:
                df_dict[col] = [payload[lower_col]]
            else:
                # default missing numeric columns to 0, categorical to empty string
                if col in ["District", "Crop name", "Season of cultivation"]:
                    df_dict[col] = [""]
                else:
                    df_dict[col] = [0]

        df = pd.DataFrame(df_dict)

        # ============================
        # Predict yield (tonnes per ha)
        # ============================
        predicted_yield = float(model.predict(df)[0])  # scalar float

        # ============================
        # Calculate expected revenue
        # ============================
        expected_revenue = None
        if crop_name in crop_prices:
            price_per_tonne = float(crop_prices[crop_name])
            expected_revenue = predicted_yield * sown_area * price_per_tonne

        return jsonify({
            "prediction_tonnes_per_ha": predicted_yield,
            "expected_revenue": expected_revenue
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ============================
# 4. Run app
# ============================
if __name__ == "__main__":
    app.run(debug=True)
