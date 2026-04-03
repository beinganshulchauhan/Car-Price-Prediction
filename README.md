# 🚗 Car Price Prediction Web App

A Machine Learning-powered web application that predicts the price of a used car based on user inputs such as company, year, fuel type, and more. The model is trained using real-world car data and deployed with a Flask backend for real-time predictions.

---

## 🌐 Live Demo

🔗 **Live App:**

https://car-price-predictictor.onrender.com/

## 📌 Features

* Predict car prices instantly
* User-friendly web interface
* Input form for car details
* Real-time prediction using trained ML model
* Clean UI with HTML & CSS

---

## 🧠 Tech Stack

* **Backend:** Python, Flask
* **Machine Learning:** Scikit-learn, Pandas, NumPy
* **Frontend:** HTML, CSS
* **Deployment:** Render

---

## 📁 Project Structure

```
Car_Price_Predictor/
│
├── app.py
├── LinearRegressionModel.pkl
├── Cleaned_Car.csv
├── requirements.txt
├── runtime.txt
├── render.yaml
│
├── templates/
│   └── index.html
│
├── static/
│   └── style.css
```

---

## ⚙️ How It Works

1. User enters car details in the form
2. Data is sent to Flask backend
3. Trained ML model processes input
4. Predicted price is returned and displayed

---

## 🚀 Run Locally

### 1. Clone the repository

```
git clone <your-repo-link>
cd Car_Price_Predictor
```

### 2. Create virtual environment

```
python -m venv venv
.\venv\Scripts\Activate
```

### 3. Install dependencies

```
pip install -r requirements.txt
```

### 4. Run the app

```
python app.py
```

### 5. Open in browser

```
http://127.0.0.1:5000/
```

---

## 📊 Machine Learning Model

* Model Used: **Linear Regression**
* Dataset: Used car dataset (`Cleaned_Car.csv`)
* Preprocessing: Data cleaning, handling missing values, encoding

---

## ⚠️ Important Notes

* Ensure Python version is **3.11.6** (for compatibility)
* Deployment uses **Gunicorn**
* `runtime.txt` and `render.yaml` control environment

---

## 📌 Future Improvements

* Add more advanced models (Random Forest, XGBoost)
* Improve UI/UX
* Add more input features
* Deploy with database support

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request.

---

## ⭐ Support

If you found this project helpful, please give it a ⭐ on GitHub!

---

## 👨‍💻 Author

**Anshul Chauhan**
