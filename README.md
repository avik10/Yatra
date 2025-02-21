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
