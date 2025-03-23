from supabase import create_client, Client
import pandas as pd

# Supabase credentials
SUPABASE_URL = "https://xrhopfxrspyfbbobrdzr.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyaG9wZnhyc3B5ZmJib2JyZHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTA4MDAsImV4cCI6MjA1ODAyNjgwMH0.PctRwNfEwzwOmZzkJhR-sfXlhxs_3PsgTjvFZR2G7Bg"

# Create Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Fetch unprocessed training data
response = supabase.table("training_data").select("timestamp, co2_ppm").eq("processed", False).execute()

# Process the fetched data
data = response.data
if data:
    df = pd.DataFrame(data)
    df.to_csv("data/new_training_data.csv", index=False)
    # Mark fetched rows as processed
    timestamps = df["timestamp"].tolist()
    supabase.table("training_data").update({"processed": True}).in_("timestamp", timestamps).execute()
    print("Fetched and saved data:", data)
else:
    # Create empty CSV if no data
    df = pd.DataFrame(columns=["timestamp", "co2_ppm"])
    df.to_csv("data/new_training_data.csv", index=False)
    print("No new training data found or an error occurred.")