from django.contrib import admin
from django.urls import path
from doctor import views

urlpatterns = [
    path('',views.home,name='home'),
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('appointments/', views.appointments_api, name='appointments_api'),
    path('doctors/', views.doctors_api, name='doctors_api'),
    path('diseases/', views.get_diseases, name='get_diseases'),
    path('stats/', views.doctor_appointment_stats,name='doctor_appointment_stats'),
    path('disease-add/', views.add_disease, name='add_disease'),
    path("recommendations/", views.recommendation_view,name='recommendation_view'),
    path('predict/',views.predict_disease,name="predict_disease")

    # path('api/medical-news/', views.medical_news, name='medical_news'),
]
