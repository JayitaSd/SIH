import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score

# Load data
df = pd.read_csv('farm_data_sampled.csv')




# Features & target
X = df.drop(['Target variable','Production','Farm_ID','Original_Row_ID','Year'], axis=1)
y = df['Target variable']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Column types
categorical_features = ['District', 'Crop name', 'Season of cultivation']
numerical_features = X_train.select_dtypes(include=['float64', 'int64']).columns.tolist()

# Preprocessor
preprocessor = ColumnTransformer(
    transformers=[
        ('num', 'passthrough', numerical_features),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
    ])

# Balanced RandomForest
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(
    random_state=42,
    n_jobs=-1,
    n_estimators=400,
    max_depth=15,
    min_samples_leaf=10,
    min_samples_split=15,
    max_features="sqrt"
)
)
])

# Train
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f'Mean Squared Error: {mse:.4f}')
print(f'R-squared: {r2:.4f}')

# Save model
joblib.dump(model, "farm_yield_pipeline.pkl")
print("✅ Model saved as farm_yield_pipeline.pkl")
