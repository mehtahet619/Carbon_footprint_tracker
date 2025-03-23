
from supabase import create_client, Client
import pandas as pd
import os

SUPABASE_URL = "https://xrhopfxrspyfbbobrdzr.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyaG9wZnhyc3B5ZmJib2JyZHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTA4MDAsImV4cCI6MjA1ODAyNjgwMH0.PctRwNfEwzwOmZzkJhR-sfXlhxs_3PsgTjvFZR2G7Bg"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
os.makedirs("data", exist_ok=True)
output_file = "data/new_training_data.csv"

print("Fetching training data from Supabase...")
response = supabase.table("training_data").select("timestamp, co2_ppm").eq("processed", False).execute()
data = response.data
print("Raw response:", data)

if data:
    df = pd.DataFrame(data)
    print("DataFrame before saving:", df.to_string())
    df.to_csv(output_file, index=False)
    timestamps = df["timestamp"].tolist()
    print("Timestamps to update:", timestamps)
    supabase.table("training_data").update({"processed": True}).in_("timestamp", timestamps).execute()
    print(f"Training data saved to {output_file}")
else:
    df = pd.DataFrame(columns=["timestamp", "co2_ppm"])
    df.to_csv(output_file, index=False)
    print("No new training data found.")