from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load model
model = pickle.load(open("farm_yield_pipeline.pkl", "rb"))

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    features = data["features"]
    prediction = model.predict([features]).tolist()
    return jsonify({"prediction": prediction})

if __name__ == "__main__":
    app.run(debug=True, port=3000)
