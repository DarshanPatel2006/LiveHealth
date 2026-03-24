import json
import os

# Load symptoms list from JSON
file_path = os.path.join(os.path.dirname(__file__), '../data/symptoms.json')

with open(file_path) as f:
    symptoms_list = json.load(f)

def encode(selected_symptoms):
    return [1 if symptom in selected_symptoms else 0 for symptom in symptoms_list]