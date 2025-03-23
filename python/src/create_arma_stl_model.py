# src/create_arma_stl_model.py
import pandas as pd
import numpy as np
from statsmodels.tsa.statespace.sarimax import SARIMAX
import joblib
import os

os.makedirs("models", exist_ok=True)
# Dummy data
dates = pd.date_range("2025-03-01", periods=10, freq="D")
co2 = [400 + i * 0.5 for i in range(10)]
df = pd.DataFrame({"timestamp": dates, "co2_ppm": co2})
df.set_index("timestamp", inplace=True)

# Fit simple ARMA model (no STL here for simplicity)
model = SARIMAX(df["co2_ppm"], order=(1, 0, 1), seasonal_order=(0, 0, 0, 0))
model_fit = model.fit(disp=False)
joblib.dump(model_fit, "models/arma_stl_model.joblib")
print("Placeholder ARMA model saved.")