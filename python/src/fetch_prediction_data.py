
from supabase import create_client, Client
import pandas as pd
import os

SUPABASE_URL = "https://xrhopfxrspyfbbobrdzr.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyaG9wZnhyc3B5ZmJib2JyZHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTA4MDAsImV4cCI6MjA1ODAyNjgwMH0.PctRwNfEwzwOmZzkJhR-sfXlhxs_3PsgTjvFZR2G7Bg"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
os.makedirs("data", exist_ok=True)
output_file = "data/new_prediction_data.csv"

print("Fetching prediction data from Supabase...")
response = supabase.table("prediction_data").select("timestamp").eq("processed", False).execute()
data = response.data
print("Raw response:", data)

if data:
    df = pd.DataFrame(data)
    df.to_csv(output_file, index=False)
    timestamps = df["timestamp"].tolist()
    supabase.table("prediction_data").update({"processed": True}).in_("timestamp", timestamps).execute()
    print(f"Prediction data saved to {output_file}")
else:
    df = pd.DataFrame(columns=["timestamp"])
    df.to_csv(output_file, index=False)
    print("No new prediction data found.")