import pandas as pd
import os

# Ensure data directory exists
os.makedirs("data", exist_ok=True)

# Load raw training data
input_file = "data/new_training_data.csv"
if not os.path.exists(input_file):
    print(f"Error: {input_file} does not exist.")
    df = pd.DataFrame(columns=["timestamp", "co2_ppm"])
else:
    df = pd.read_csv(input_file)
    print("Input data:", df.to_dict())

# Preprocessing
if not df.empty:
    df = df.dropna()
    df["timestamp"] = pd.to_datetime(df["timestamp"])
    df = df.sort_values("timestamp")
else:
    print("Input is empty, creating empty processed file.")

# Save processed data
output_file = "data/processed_training_data.csv"
df.to_csv(output_file, index=False)
print(f"Processed data saved to {output_file}")