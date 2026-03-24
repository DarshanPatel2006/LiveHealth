import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
file_path = os.path.join(BASE_DIR, 'data', 'treatment_data.json')

with open(file_path) as f:
    treatment_data = json.load(f)


def get_treatment(disease):
    return treatment_data.get(disease, {
        "allopathy": "Consult doctor",
        "homeopathy": "Consult expert",
        "diet": "Balanced diet"
    })