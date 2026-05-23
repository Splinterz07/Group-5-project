# Bookify API Documentation

## Base URL
http://localhost:5000/api

---

## Events

### Get all events
- **GET** `/events`
- **Auth required:** No
- **Response:** Array of event objects

### Get single event
- **GET** `/events/:id`
- **Auth required:** No
- **Response:** Single event object

### Update an event
- **PUT** `/events/:id`
- **Auth required:** No
- **Body:**
```json
{
  "title": "string",
  "description": "string",
  "date": "string",
  "location": "string",
  "totalSeats": "number",
  "price": "number"
}
```

---

## Bookings

### Get all bookings
- **GET** `/bookings`
- **Auth required:** No
- **Response:** Array of booking objects

### Create a booking
- **POST** `/bookings`
- **Auth required:** No
- **Body:**
```json
{
  "eventId": "string",
  "name": "string",
  "email": "string",
  "seats": "number"
}
```

### Cancel a booking
- **DELETE** `/bookings/:id`
- **Auth required:** No
- **Response:** Success message