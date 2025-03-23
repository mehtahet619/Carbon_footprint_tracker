from flask import Flask, jsonify
import pandas as pd
import os

app = Flask(__name__)

@app.route('/predictions', methods=['GET'])
def get_predictions():
    file_path = "data/predicted_co2.csv"
    if not os.path.exists(file_path):
        return jsonify({"error": "Predictions file not found"}), 404
    
    df = pd.read_csv(file_path)
    predictions = df.to_dict(orient="records")
    return jsonify({"predictions": predictions})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)