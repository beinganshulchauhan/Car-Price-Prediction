import os
import pandas as pd
import joblib
import numpy as np
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Load model and data
MODEL_PATH = 'LinearRegressionModel.pkl'
DATA_PATH = 'Cleaned Car.csv'

pipe = joblib.load(MODEL_PATH)
print("Model loaded successfully")

df = pd.read_csv(DATA_PATH)
print(f"Data loaded: shape={df.shape}, columns={df.columns.tolist()}")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/companies')
def get_companies():
    companies = sorted(df['company'].dropna().unique().tolist())
    return jsonify(companies)

@app.route('/models/<company>')
def get_models(company):
    models = df[df['company'] == company]['name'].dropna().unique().tolist()
    return jsonify(models)

@app.route('/fuel_types')
def get_fuel_types():
    fuel_types = sorted(df['fuel_type'].dropna().unique().tolist())
    return jsonify(fuel_types)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        name = data.get('name', '')
        company = data.get('company', '')
        year = int(data.get('year', 2020))
        kms_driven = int(data.get('kms_driven', 50000))
        fuel_type = data.get('fuel_type', 'Petrol')

        # Prepare input DataFrame matching training data
        input_df = pd.DataFrame({
            'name': [name],
            'company': [company],
            'year': [year],
            'kms_driven': [kms_driven],
            'fuel_type': [fuel_type]
        })

        prediction = pipe.predict(input_df)[0]
        return jsonify({'predicted_price': int(prediction), 'currency': 'INR'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

