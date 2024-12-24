# Shoppex Admin Dashboard

The **Shoppex Admin Dashboard** project is a full-stack application combining a **Node.js** backend and a **React.js** frontend. This repository contains both the admin panel managed in one central repository with concurrent development and build scripts.

## Project Structure

This project is organized into two main parts:
- **Backend** (Node.js)
- **Frontend** (React.js)

### How to Use:
1. **Clone the repo**: `git clone https://github.com/yourusername/shoppex_ecommerce_adminpanel.git`
2. **Install dependencies**: Run `npm install` to install root dependencies, `npm run install:frontend` for frontend dependencies, and `npm run install:backend` for backend dependencies.
3. **Run the development environment**: `npm run dev` to start both frontend and backend concurrently.
4. **Build for production**: `npm run build`.

### API Documentation (Swagger)

The API documentation for the backend is accessible via Swagger. To view the API documentation, follow these steps:

1. **Start the backend**: Ensure the backend server is running by executing `npm run dev` in the root directory.
2. **Access Swagger**: Open your browser and go to the following URL:  
   `http://localhost:<backend-port>/api-docs`

   This will open the Swagger UI where you can explore the available API endpoints, their details, request parameters, and response models.
   
> **Note**: Replace `<backend-port>` with the actual port number your backend is running on (e.g., 5000).
