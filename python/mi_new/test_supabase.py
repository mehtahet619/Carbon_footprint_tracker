from supabase import create_client
import os

supabase_url = os.getenv("https://xrhopfxrspyfbbobrdzr.supabase.co")
supabase_key = os.getenv("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyaG9wZnhyc3B5ZmJib2JyZHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTA4MDAsImV4cCI6MjA1ODAyNjgwMH0.PctRwNfEwzwOmZzkJhR-sfXlhxs_3PsgTjvFZR2G7Bg")
supabase = create_client(supabase_url, supabase_key)

try:
    response = supabase.table("training_data").select("timestamp, co2_ppm").eq("processed", False).execute()
    print("Connection successful! Data:", response.data)
except Exception as e:
    print("Connection failed:", str(e))