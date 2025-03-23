FROM python:3.9-slim
WORKDIR /app
RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*
COPY . .
RUN pip install --no-cache-dir \
    supabase \
    pandas \
    dvc \
    scikit-learn \
    joblib \
    statsmodels
ENV SUPABASE_URL=https://xrhopfxrspyfbbobrdzr.supabase.co
ENV SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyaG9wZnhyc3B5ZmJib2JyZHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTA4MDAsImV4cCI6MjA1ODAyNjgwMH0.PctRwNfEwzwOmZzkJhR-sfXlhxs_3PsgTjvFZR2G7Bg
CMD ["dvc", "repro"]