import json
import os

file_path = os.path.join(os.path.dirname(__file__), '../data/disease_info.json')

with open(file_path) as f:
    disease_data = json.load(f)

def generate_report(disease, confidence):
    info = disease_data.get(disease, {})

    return {
        "disease": disease,
        "confidence": confidence,
        "description": info.get("description", "No data available"),
        "severity": info.get("severity", "unknown"),
        "doctor_required": info.get("doctor_required", False)
    }