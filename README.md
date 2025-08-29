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

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### GET /

Root endpoint with API information.

## Installation & Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Local Development

1. **Clone or download the project files**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **For production:**
   ```bash
   npm start
   ```

The API will be available at `http://localhost:3000`

### Testing

1. **Install test dependencies:**
   ```bash
   npm install axios
   ```

2. **Run tests:**
   ```bash
   node test.js
   ```

## API Logic

### Data Processing Rules

1. **Numbers**: Separated into odd and even arrays, summed up
2. **Alphabets**: Converted to uppercase
3. **Special Characters**: Any non-alphanumeric characters
4. **Concatenation**: All alphabets joined, reversed, and converted to alternating caps

### User ID Format

The `user_id` follows the format: `{full_name_ddmmyyyy}`
- Example: `john_doe_17091999`
- Full name is always in lowercase
- Date format: DDMMYYYY

### Response Fields

- `is_success`: Boolean indicating operation status
- `user_id`: Generated user ID with current date
- `email`: User email (configurable)
- `roll_number`: User roll number (configurable)
- `odd_numbers`: Array of odd numbers as strings
- `even_numbers`: Array of even numbers as strings
- `alphabets`: Array of uppercase alphabets
- `special_characters`: Array of special characters
- `sum`: Sum of all numbers as a string
- `concat_string`: Concatenated alphabets in reverse with alternating caps

## Deployment

### Heroku Deployment

1. **Create a Heroku account** and install Heroku CLI

2. **Login to Heroku:**
   ```bash
   heroku login
   ```

3. **Create a new Heroku app:**
   ```bash
   heroku create your-app-name
   ```

4. **Deploy to Heroku:**
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push heroku main
   ```

5. **Open the app:**
   ```bash
   heroku open
   ```

### Environment Variables

The app uses the following environment variables:
- `PORT`: Server port (default: 3000)

### Customization

You can modify the user information in `server.js`:

```javascript
const USER_INFO = {
    fullName: "your_name_here",
    email: "your_email@example.com",
    rollNumber: "YOUR_ROLL_NUMBER"
};
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input (missing or non-array data)
- **404 Not Found**: Invalid endpoints
- **500 Internal Server Error**: Server-side errors

All error responses include:
```json
{
  "is_success": false,
  "error": "Error description"
}
```

## Security Features

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing
- **Input validation**: Request body validation
- **Error handling**: Graceful error responses

## Example Usage

### cURL Example

```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a", "1", "334", "4", "R", "$"]}'
```

### JavaScript Example

```javascript
const response = await fetch('http://localhost:3000/bfhl', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    data: ["a", "1", "334", "4", "R", "$"]
  })
});

const result = await response.json();
console.log(result);
```

## Project Structure

```
bajaj-api/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── test.js           # Test cases
└── README.md         # Documentation
```

## License

MIT License - feel free to use this project for your needs.
