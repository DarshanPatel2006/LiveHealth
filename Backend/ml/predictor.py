import joblib
import os

model_path = os.path.join(os.path.dirname(__file__), '../doctor/trained_model.joblib')
model = joblib.load(model_path)

def predict(symptom_vector):
    prediction = model.predict([symptom_vector])[0]
    confidence = round(model.predict_proba([symptom_vector]).max() * 100, 2)
    return prediction, confidence