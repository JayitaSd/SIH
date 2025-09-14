import pandas as pd

# Load dataset
df = pd.read_csv("farm_data_sampled.csv")

# Compute district-wise averages
district_defaults = (
    df.groupby("District")[["Soil N", "Soil P", "Soil K", "Soil pH"]]
    .mean()
    .round(2)  # round to 2 decimals
    .to_dict(orient="index")
)

print("District-wise soil defaults:")
for district, values in district_defaults.items():
    print(district, values)

import json

with open("district_defaults.json", "w") as f:
    json.dump(district_defaults, f, indent=4)

