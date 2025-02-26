#!/bin/bash

curl -X POST "http://localhost:3000/api/appointments" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "address": "456 Secondary St",
    "location": "Los Angeles, CA",
    "appointmentDate": "2025-03-10T10:30:00",
    "email": "janedoe@example.com",
    "phoneNumber": "+1987654321",
    "propertyType": "residential",
    "squareFootage": 1500
}'
