# Vanshi Frontend

The client-side interface for the Vanshi Forest Carbon Asset Marketplace. Built with React and Vite for a fast and modern user experience.

## Tech Stack
- **Framework**: React.js
- **Build Tool**: Vite
- **Styling**: CSS / Framer Motion (for animations)
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Icons**: Lucide React

## Prerequisites
- Node.js (v16+)

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Server
Starts the local development server (usually at http://localhost:5173):
```bash
npm run dev
```

### Build for Production
Builds the app for deployment to the `dist` folder:
```bash
npm run build
```

### Preview Production Build
Preview the built application locally:
```bash
npm run preview
```

## Configuration
The frontend communicates with the backend at `http://localhost:5000`. Ensure the backend server is running before starting the frontend.
