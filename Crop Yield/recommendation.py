import pandas as pd

# Load dataset
df = pd.read_csv("odisha_crop_recommendations.csv")

recommend = (
    df.to_dict(orient="records")
)

import json


with open("recommend.json", "w") as f:
    json.dump(recommend, f, indent=4)

