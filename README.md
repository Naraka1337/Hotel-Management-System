# 🏨 Hotel Management System

A full-stack hotel management system with React frontend and FastAPI backend.

## 📁 Project Structure

```
Hotel-Management-System/
├── src/              # Frontend (React + Vite)
├── backend/          # Backend (FastAPI + SQLite)
├── package.json      # Frontend dependencies
└── README.md
```

## 🚀 Quick Start

### Frontend Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend runs on `http://localhost:5173`

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Run FastAPI server
uvicorn main:app --reload --port 8000
```

Backend runs on `http://localhost:8000`

API Documentation: `http://localhost:8000/docs`

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- TailwindCSS
- React Router
- Axios

### Backend
- FastAPI
- SQLite
- SQLAlchemy
- JWT Authentication

## 📝 Features

- 🔐 User Authentication (Register/Login)
- 🏨 Hotel Management
- 🛏️ Room Management
- 📅 Booking System
- 👥 User Management (Admin)
- 📊 Dashboard Analytics

## 🔑 Default Roles

- **Admin**: Full system access
- **Manager**: Hotel-specific management
- **Guest**: Public booking access

## 📚 API Endpoints

See `backend/README.md` for detailed API documentation.

## 🗄️ Database

SQLite database (`hotel.db`) is created automatically in the `backend/` directory on first run.

## 📄 License

MIT License
