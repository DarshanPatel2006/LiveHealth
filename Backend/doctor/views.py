from django.shortcuts import render
from django.http import JsonResponse
from pymongo import MongoClient
from django.contrib.auth.hashers import make_password, check_password
import json
from django.views.decorators.csrf import csrf_exempt
import requests
from bs4 import BeautifulSoup
import feedparser
from bson import json_util
from bson.json_util import dumps
# Simple home view (if needed)

from django.http import JsonResponse
from rest_framework.decorators import api_view
import joblib
import os

from rest_framework.decorators import api_view
from django.http import JsonResponse

from ml.predictor import predict
from utils.symptom_encoder import encode

from utils.report_generator import generate_report
from utils.treatment_engine import get_treatment


# ================== 🔥 MONGODB CONNECTION (ONLY CHANGE) ==================
MONGO_URI = "mongodb+srv://campustalk2026_db_user:XfC92GTFkXnLB4Ra@jeevixacluster.3rndwwv.mongodb.net/jeevixa?retryWrites=true&w=majority"

client = MongoClient(MONGO_URI)
db = client["jeevixa"]
# =======================================================================

# Load the model once globally
model_path = os.path.join(os.path.dirname(__file__), 'trained_model.joblib')
model = joblib.load(model_path)

# Symptom list (same as used during training)

@api_view(['POST'])
def predict_disease(request):
    try:
        symptoms = request.data.get('symptoms', [])

        if not symptoms:
            return JsonResponse({'error': 'No symptoms provided'}, status=400)

        vector = encode(symptoms)
        disease, confidence = predict(vector)

        # NEW LAYERS
        report = generate_report(disease, confidence)
        treatment = get_treatment(disease)

        # Decision logic
        warning = None
        if confidence < 50:
            warning = "Low confidence prediction. Please consult a doctor."

        return JsonResponse({
            "report": report,
            "treatment": treatment,
            "warning": warning
        })

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def home(request):
    return render(request, 'home.html')

@csrf_exempt
def signup_view(request):
    if request.method == 'OPTIONS':
        response = JsonResponse({'message': 'Options request allowed'})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            role = data.get('role')
            email = data.get('email')
            password = data.get('password')
            confirm_password = data.get('confirmPassword')

            if not email or not password or not role:
                response = JsonResponse({'message': 'Email, password, and role are required'}, status=400)
                response["Access-Control-Allow-Origin"] = "*"
                return response

            if password != confirm_password:
                response = JsonResponse({'message': 'Passwords do not match'}, status=400)
                response["Access-Control-Allow-Origin"] = "*"
                return response

            
            users = db['users']

            if users.find_one({'email': email}):
                response = JsonResponse({'message': 'User already exists'}, status=400)
                response["Access-Control-Allow-Origin"] = "*"
                return response

            # Common fields
            user_data = {
                'role': role,
                'email': email,
                'password': make_password(password),
                'name': data.get('name'),
                'phone': data.get('phone')
            }

            # Additional fields based on role
            if role == 'doctor':
                user_data.update({
                    'specialization': data.get('specialization'),
                    'experience': data.get('experience'),
                    'clinicAddress': data.get('clinicAddress'),
                    'qualification': data.get('qualification')
                })
            elif role == 'patient':
                user_data.update({
                    'age': data.get('age'),
                    'gender': data.get('gender'),
                    'address': data.get('address'),
                    'medicalHistory': data.get('medicalHistory')
                })

            users.insert_one(user_data)

            response = JsonResponse({'message': 'Signup successful'}, status=201)
            response["Access-Control-Allow-Origin"] = "*"
            return response

        except Exception as e:
            response = JsonResponse({'error': str(e)}, status=500)
            response["Access-Control-Allow-Origin"] = "*"
            return response

    response = JsonResponse({'message': 'Only POST method allowed'}, status=405)
    response["Access-Control-Allow-Origin"] = "*"
    return response

@csrf_exempt
def login_view(request):
    if request.method == 'OPTIONS':
        response = JsonResponse({'message': 'Options request allowed'})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                response = JsonResponse({'message': 'Email and password required'}, status=400)
                response["Access-Control-Allow-Origin"] = "*"
                return response

            
            users = db['users']

            user = users.find_one({'email': email})
            if not user:
                response = JsonResponse({'message': 'User not found'}, status=404)
                response["Access-Control-Allow-Origin"] = "*"
                return response

            if not check_password(password, user['password']):
                response = JsonResponse({'message': 'Incorrect password'}, status=401)
                response["Access-Control-Allow-Origin"] = "*"
                return response

            # Here return role also
            response = JsonResponse({
                'message': 'Login successful',
                'role': user.get('role'),
                'name': user.get('name'),
                'email': user.get('email'),
                'phone': user.get('phone'),
            }, status=200)
            response["Access-Control-Allow-Origin"] = "*"
            return response

        except Exception as e:
            response = JsonResponse({'error': str(e)}, status=500)
            response["Access-Control-Allow-Origin"] = "*"
            return response

    response = JsonResponse({'message': 'Only POST method allowed'}, status=405)
    response["Access-Control-Allow-Origin"] = "*"
    return response

@csrf_exempt
def appointments_api(request):
    
    appointments = db['appointments']

    if request.method == 'OPTIONS':
        response = JsonResponse({'message': 'Options request allowed'})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            # Required fields: patient, doctor, date, time, reason
            required = ['patient', 'doctor', 'date', 'time', 'reason']
            if not all(k in data and data[k] for k in required):
                response = JsonResponse({'message': 'Missing required fields'}, status=400)
                response["Access-Control-Allow-Origin"] = "*"
                return response
            appointment = {
                'patient': data['patient'],
                'doctor': data['doctor'],
                'date': data['date'],
                'time': data['time'],
                'reason': data['reason'],
                'status': data.get('status', 'Pending'),
                'message':''
            }
            result = appointments.insert_one(appointment)
            appointment['_id'] = str(result.inserted_id)
            response = JsonResponse({'message': 'Appointment created', 'appointment': appointment}, status=201)
            response["Access-Control-Allow-Origin"] = "*"
            return response
        except Exception as e:
            response = JsonResponse({'error': str(e)}, status=500)
            response["Access-Control-Allow-Origin"] = "*"
            return response

    if request.method == 'GET':
        try:
            # Optionally filter by patient or doctor via query params
            patient = request.GET.get('patient')
            doctor = request.GET.get('doctor')
            query = {}
            if patient:
                query['patient'] = patient
            if doctor:
                query['doctor'] = doctor
            appts = list(appointments.find(query))
            for a in appts:
                a['_id'] = str(a['_id'])
            response = JsonResponse({'appointments': appts}, status=200)
            response["Access-Control-Allow-Origin"] = "*"
            return response
        except Exception as e:
            response = JsonResponse({'error': str(e)}, status=500)
            response["Access-Control-Allow-Origin"] = "*"
            return response

    if request.method == 'PUT':
        try:
            data = json.loads(request.body.decode('utf-8'))
            appt_id = data.get('_id')
            status = data.get('status')
            message = data.get('message', '')
            if not appt_id or not status:
                response = JsonResponse({'message': 'Missing _id or status'}, status=400)
                response["Access-Control-Allow-Origin"] = "*"
                return response
            from bson import ObjectId
            
            appointments = db['appointments']
            update_fields = {'status': status, 'message': message}
            result = appointments.update_one({'_id': ObjectId(appt_id)}, {'$set': update_fields})
            if result.matched_count == 0:
                response = JsonResponse({'message': 'Appointment not found'}, status=404)
                response["Access-Control-Allow-Origin"] = "*"
                return response
            updated = appointments.find_one({'_id': ObjectId(appt_id)})
            updated['_id'] = str(updated['_id'])
            response = JsonResponse({'message': 'Appointment updated', 'appointment': updated}, status=200)
            response["Access-Control-Allow-Origin"] = "*"
            return response
        except Exception as e:
            response = JsonResponse({'error': str(e)}, status=500)
            response["Access-Control-Allow-Origin"] = "*"
            return response

    response = JsonResponse({'message': 'Method not allowed'}, status=405)
    response["Access-Control-Allow-Origin"] = "*"
    return response

@csrf_exempt
def doctors_api(request):
    if request.method == 'OPTIONS':
        response = JsonResponse({'message': 'Options request allowed'})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    if request.method == 'GET':
        try:
            
            users = db['users']
            doctors = list(users.find({'role': 'doctor'}))
            for d in doctors:
                d['_id'] = str(d['_id'])
            # Only return relevant fields
            doctor_list = [
                {
                    '_id': d['_id'],
                    'name': d.get('name', ''),
                    'specialty': d.get('specialization', ''),
                    'email': d.get('email', ''),
                    'phone': d.get('phone', ''),
                }
                for d in doctors
            ]
            response = JsonResponse({'doctors': doctor_list}, status=200)
            response["Access-Control-Allow-Origin"] = "*"
            return response
        except Exception as e:
            response = JsonResponse({'error': str(e)}, status=500)
            response["Access-Control-Allow-Origin"] = "*"
            return response

    response = JsonResponse({'message': 'Method not allowed'}, status=405)
    response["Access-Control-Allow-Origin"] = "*"
    print("hello !")
    return response

@csrf_exempt
def get_diseases(request):
    if request.method == "GET":
        try:
            client = MongoClient("mongodb://localhost:27017/")
            db = client["Digital_Doctor"]
            disease_collection = db["diseasepost"]

            diseases = list(disease_collection.find({}, {"_id": 0}))

            response = JsonResponse(diseases, safe=False)
            response["Access-Control-Allow-Origin"] = "*"
            return response
        except Exception as e:
            response = JsonResponse({"error": str(e)}, status=500)
            response["Access-Control-Allow-Origin"] = "*"
            return response
    else:
        response = JsonResponse({"error": "Only GET method is allowed."}, status=405)
        response["Access-Control-Allow-Origin"] = "*"
        return response


@csrf_exempt
def doctor_appointment_stats(request):
    # Always allow OPTIONS for CORS
    if request.method == 'OPTIONS':
        response = JsonResponse({'message': 'CORS preflight passed'})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    # Main logic
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            email = data.get('email')

            if not email:
                response = JsonResponse({'message': 'Email is required'}, status=400)
                response["Access-Control-Allow-Origin"] = "*"
                return response

            client = MongoClient("mongodb://localhost:27017/")
            db = client["Digital_Doctor"]
            appointments = db["appointments"]

            accepted = appointments.count_documents({"doctor": email, "status": "Accepted"})
            rejected = appointments.count_documents({"doctor": email, "status": "Rejected"})
            pending = appointments.count_documents({"doctor": email, "status": "Pending"})

            response = JsonResponse({
                "accepted": accepted,
                "rejected": rejected,
                "pending": pending
            }, status=200)
            response["Access-Control-Allow-Origin"] = "*"
            return response

        except Exception as e:
            response = JsonResponse({'error': str(e)}, status=500)
            response["Access-Control-Allow-Origin"] = "*"
            return response

    # For all other methods
    response = JsonResponse({'message': 'Method not allowed'}, status=200)  # Don't use 405
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    response["Access-Control-Allow-Headers"] = "Content-Type"
    return response


@csrf_exempt
def add_disease(request):
    # Handle CORS preflight
    if request.method == "OPTIONS":
        response = JsonResponse({'message': 'CORS preflight passed'})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    if request.method == "POST":
        try:
            data = json.loads(request.body)

            # Required fields check
            required = ["id", "category", "name", "description", "symptoms", "email"]
            if not all(field in data for field in required):
                response = JsonResponse({"error": "Missing required fields"}, status=400)
                response["Access-Control-Allow-Origin"] = "*"
                return response

            # MongoDB connection inside the function
            client = MongoClient("mongodb://localhost:27017/")
            db = client["Digital_Doctor"]
            collection = db["diseasepost"]

            # Insert to MongoDB
            collection.insert_one(data)

            response = JsonResponse({"message": "Disease added successfully"}, status=201)
            response["Access-Control-Allow-Origin"] = "*"
            return response

        except Exception as e:
            response = JsonResponse({"error": str(e)}, status=500)
            response["Access-Control-Allow-Origin"] = "*"
            return response

    response = JsonResponse({"error": "Only POST allowed"}, status=405)
    response["Access-Control-Allow-Origin"] = "*"
    return response



@csrf_exempt
def recommendation_view(request):
    try:
        if request.method == "OPTIONS":
            # Handle CORS preflight request
            response = JsonResponse({"message": "CORS preflight successful"})
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
            response["Access-Control-Allow-Headers"] = "Content-Type"
            return response

        client = MongoClient("mongodb://localhost:27017/")
        db = client["Digital_Doctor"]
        collection = db["diseasepost"]

        if request.method == "GET":
            email = request.GET.get("email")
            if not email:
                return JsonResponse({"error": "Email is required in query params."}, status=400)

            data = list(collection.find({"email": email}, {"_id": 0}))
            response = JsonResponse(data, safe=False)
            response["Access-Control-Allow-Origin"] = "*"
            return response

        elif request.method == "POST":
            body = json.loads(request.body)

            required_fields = ["category", "id", "name", "description", "symptoms", "email"]
            if not all(field in body for field in required_fields):
                return JsonResponse({"error": "Missing fields in request body."}, status=400)

            collection.insert_one(body)

            response = JsonResponse({"message": "Recommendation added successfully."}, status=201)
            response["Access-Control-Allow-Origin"] = "*"
            return response

        else:
            response = JsonResponse({"error": "Method not allowed"}, status=405)
            response["Access-Control-Allow-Origin"] = "*"
            return response

    except Exception as e:
        response = JsonResponse({"error": str(e)}, status=500)
        response["Access-Control-Allow-Origin"] = "*"
        return response
