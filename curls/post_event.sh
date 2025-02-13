curl -X POST http://localhost:3000/api/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "address": "123 Main St",
    "location": "New York, NY",
    "appointmentDate": "2025-02-15T14:00:00",
    "email": "johndoe@example.com",
    "phoneNumber": "+1234567890"
  }'