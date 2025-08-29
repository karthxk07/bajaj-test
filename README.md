# Bajaj REST API

A Node.js REST API that processes arrays and categorizes data into different types (numbers, alphabets, special characters) with various operations.

## Features

- **POST /bfhl** - Main endpoint that processes arrays
- Input validation and error handling
- CORS enabled for cross-origin requests
- Security headers with Helmet
- Health check endpoint
- Comprehensive logging

## API Endpoints

### POST /bfhl

Processes an array and returns categorized data.

**Request Body:**
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```
