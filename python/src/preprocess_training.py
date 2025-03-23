import pandas as pd
import os

os.makedirs("data", exist_ok=True)
input_file = "data/new_training_data.csv"
output_file = "data/processed_training_data.csv"

df = pd.read_csv(input_file)
df["timestamp"] = pd.to_datetime(df["timestamp"])
df.dropna(inplace=True)
df.to_csv(output_file, index=False)
print(f"Processed data saved to {output_file}")