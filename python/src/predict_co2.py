import pandas as pd
import joblib
import os

os.makedirs("data", exist_ok=True)
input_file = "data/processed_training_data.csv"  # Updated input
model_file = "models/arma_stl_model.joblib"
output_file = "data/predicted_co2.csv"

if not os.path.exists(input_file):
    print(f"Error: {input_file} not found.")
    df_out = pd.DataFrame(columns=["timestamp", "predicted_co2"])
else:
    df = pd.read_csv(input_file)
    print("Prediction input:", df.to_string())

    if df.empty:
        print("No data to predict!")
        df_out = pd.DataFrame(columns=["timestamp", "predicted_co2"])
    else:
        df["timestamp"] = pd.to_datetime(df["timestamp"])
        df.set_index("timestamp", inplace=True)
        model = joblib.load(model_file)
        predictions = model.forecast(steps=len(df))
        df_out = pd.DataFrame({"timestamp": df.index, "predicted_co2": predictions})
        df_out.reset_index(drop=True, inplace=True)
        print("Predictions:", df_out.to_string())

df_out.to_csv(output_file, index=False)
print(f"Predictions saved to {output_file}")