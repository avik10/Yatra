# User Registration Endpoint

## Endpoint
`POST /users`

## Description
This endpoint allows you to create a new user by providing the necessary details.

## Request
### Headers
- `Content-Type: application/json`

### Body
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Response
### Success (201 Created)
```json
{
  "message": "User created successfully",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }
}
```

### Error (400 Bad Request)
```json
{
  "error": "All Fields are required"
}
```

### Error (409 Conflict)
```json
{
  "error": "User Already exist"
}
```

### Error (500 Internal Server Error)
```json
{
  "error": "Error creating user: <error_message>"
}
```

# User Login Endpoint

## Endpoint
`GET /users/login`

## Description
This endpoint allows a user to log in by providing their email and password.

## Request
### Headers
- `Content-Type: application/json`

### Body
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Response
### Success (200 OK)
```json
{
  "message": "Login successful",
  "token": "<jwt_token>"
}
```

### Error (400 Bad Request)
```json
{
  "error": "Invalid Email or Password"
}
```

### Error (500 Internal Server Error)
```json
{
  "error": "Error logging in: <error_message>"
}
```

# API Documentation

## Endpoints

### User Profile

**Endpoint:** `GET /user/profile`

**Headers:**
- `Authorization: Bearer <token>`

**Sample Request:**
```http
GET /user/profile HTTP/1.1
Host: example.com
Authorization: Bearer <token>
```

**Sample Response:**
```json
{
    "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    }
}
```

### Logout

**Endpoint:** `GET /user/logout`

**Headers:**
- `Authorization: Bearer <token>`

**Sample Request:**
```http
GET /user/logout HTTP/1.1
Host: example.com
Authorization: Bearer <token>
```

**Sample Response:**
```json
{
    "message": "Logout Successfully"
}
```

### Create Captain

**Endpoint:** `POST /captains`

**Description:** Creates a new captain.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "vehicleType": "rickshaw",
    "color": "red",
    "plate": "ABC123",
    "capacity": 3
  }
}
```

**Response:**
```json
{
  "newCaptain": {
    "_id": "60c72b2f9b1e8b001c8e4d5a",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 3,
      "vehicleType": "rickshaw"
    },
    "status": "inactive",
    "location": {
      "lat": null,
      "lng": null
    }
  },
  "message": "Captain created successfully"
}
```

**Errors:**
- `400 Bad Request`: Validation errors or missing fields.
- `401 Unauthorized`: Invalid input data.
- `409 Conflict`: User already exists.
