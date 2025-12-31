# Vanshi Backend

The backend REST API for the Vanshi Forest Carbon Asset Marketplace. Handles user authentication, project management, and carbon credit data.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens)

## Prerequisites
- Node.js (v16+)
- MongoDB running locally on `localhost:27017`

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in this directory with the following content:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/vanshi
   JWT_SECRET=vanshi_platinum_secret_2024
   ```

## Running the Server

### Development Mode
Runs the server with `node server.js`:
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## Folder Structure
- `/controllers`: Logic for handling API requests
- `/models`: Mongoose database schemas
- `/routes`: API route definitions
- `/middleware`: Custom middleware (e.g., auth)
- `server.js`: Application entry point
