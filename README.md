# Node.js MongoDB API

A simple Node.js Express API that connects to MongoDB and retrieves user data with age filtering.

## Approach

This solution implements a RESTful API endpoint that retrieves user data from MongoDB. The implementation includes proper error handling for invalid ObjectIds and enforces an age restriction (>21) on the queries. The code follows best practices with async/await pattern and proper separation of concerns.

## API Documentation

The API is documented using Swagger UI. After starting the server, you can access the interactive API documentation at:

```plaintext
http://localhost:3000/swagger-ui
```

This provides a detailed overview of all available endpoints, request/response schemas, and allows you to test the API directly from the browser.

## Prerequisites

### Installing Node.js

#### Installing on macOS

1. Using Homebrew:

```bash
# Install Homebrew if you haven't already
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Verify installation
node --version
npm --version
```

1. Alternatively, download the installer from [Node.js official website](https://nodejs.org/)

#### Installing on Linux (Ubuntu/Debian)

1. Using apt:

```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

#### Installing on Windows

1. Download the Windows Installer from [Node.js official website](https://nodejs.org/)
2. Run the installer (e.g., node-v20.x.x-x64.msi)
3. Follow the installation wizard
4. Open Command Prompt or PowerShell and verify installation:

```powershell
node --version
npm --version
```

### Installing MongoDB

#### Installing MongoDB on macOS

1. Using Homebrew:

```bash
# Install Homebrew if you haven't already
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community
```

#### Installing MongoDB on Linux (Ubuntu/Debian)

```bash
# Import MongoDB public key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package list and install MongoDB
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### Installing MongoDB on Windows

1. Download the MongoDB Community Server installer from the [official MongoDB website](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the installation wizard
3. Choose "Complete" setup type
4. Install MongoDB Compass (optional but recommended GUI tool)
5. MongoDB will be installed as a Windows Service and start automatically

### Verifying MongoDB Installation

To verify that MongoDB is running correctly:

```bash
# Connect to MongoDB shell
mongosh

# You should see a welcome message and a prompt
# Type the following to check the version
db.version()
```

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
