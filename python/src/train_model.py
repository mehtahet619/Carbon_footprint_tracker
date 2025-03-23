import pandas as pd
import joblib
from statsmodels.tsa.statespace.sarimax import SARIMAX
import os

os.makedirs("models", exist_ok=True)
input_file = "data/processed_training_data.csv"
output_file = "models/arma_stl_model.joblib"

df = pd.read_csv(input_file)
print("Training data:", df.to_string())

if df.empty:
    print("No data to train on! Saving default model.")
    # Default model if no data
    model = SARIMAX([400, 405], order=(1, 0, 1))
    model_fit = model.fit(disp=False)
else:
    df["timestamp"] = pd.to_datetime(df["timestamp"])
    df.set_index("timestamp", inplace=True)
    model = SARIMAX(df["co2_ppm"], order=(1, 0, 1), seasonal_order=(0, 0, 0, 0))
    model_fit = model.fit(disp=False)
    print("Model trained successfully.")

joblib.dump(model_fit, output_file)
print(f"Model saved to {output_file}")