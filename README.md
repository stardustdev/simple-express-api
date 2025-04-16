# Node.js MongoDB API

A simple Node.js Express API that connects to MongoDB and retrieves user data with age filtering.

## Approach

This solution implements a RESTful API endpoint that retrieves user data from MongoDB. The implementation includes proper error handling for invalid ObjectIds and enforces an age restriction (>21) on the queries. The code follows best practices with async/await pattern and proper separation of concerns.

## Setup

### Install dependencies

```bash
npm install
```

### Configure environment variables

```bash
cp .env.example .env
```

Edit the `.env` file with your specific configuration:

```env
# Server Configuration
PORT=3000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/userdb

# API Configuration
NODE_ENV=development
```

### Start the development server

```bash
npm run dev:ts
```

### Build and start the production server

```bash
npm run build
npm start
```

## Environment Variables

- `PORT`: The port number for the server (default: 3000)
- `MONGODB_URI`: MongoDB connection string (default: mongodb://localhost:27017/userdb)
- `NODE_ENV`: Application environment (development/production)

## API Endpoints

### Create User

**POST** `/users`

- **Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25
}
```

- **Response:** 201 Created
- **Note:** Age must be greater than 21

### Get User

**GET** `/users/:id`

- **Response:** 200 OK
- **Note:** Only returns users with age > 21

### Update User

**PUT** `/users/:id`

- **Body:**

```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "age": 26
}
```

- **Response:** 200 OK
- **Note:** All fields are optional, but age must be > 21 if provided

### Delete User

**DELETE** `/users/:id`

- **Response:** 204 No Content

### Error Responses

- 400 Bad Request: Invalid input or age requirement not met
- 404 Not Found: User doesn't exist
- 500 Internal Server Error: Server-side error
