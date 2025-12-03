# 🏨 Hotel Management System

A modern, full-stack Hotel Management System built with **React 19** and **FastAPI**. This application provides a comprehensive solution for managing hotels, rooms, bookings, and users with role-based access control (Admin, Manager, Guest).

---

## 🚀 Features

### 🌟 Public / Guest
- **Browse Hotels:** View a list of available hotels with images and descriptions.
- **Room Booking:** Search for rooms by date and book them instantly.
- **My Bookings:** View personal booking history and status.
- **Authentication:** Secure registration and login system.

### 💼 Hotel Manager
- **Dashboard:** Real-time overview of total rooms, bookings, revenue, and occupancy rates.
- **Room Management:** Add, edit, and delete rooms with details like price, capacity, and amenities.
- **Booking Oversight:** View recent bookings for managed hotels.
- **Hotel Management:** Manage details of assigned hotels.

### 🛡️ System Admin
- **Global Dashboard:** High-level analytics of the entire platform (Total Users, Hotels, Revenue).
- **User Management:** View, edit, and ban users; manage user roles.
- **Hotel Management:** Create and delete hotels; assign managers.
- **System Settings:** Configure global platform settings.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **Styling:** TailwindCSS
- **State Management:** React Query (@tanstack/react-query)
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Notifications:** React Toastify

### Backend
- **Framework:** FastAPI
- **Database:** SQLite (SQLAlchemy ORM)
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Pydantic
- **Security:** Passlib (Bcrypt hashing)

---

## 📂 Project Structure

```
Hotel-Management-System/
├── src/                        # Frontend Source Code
│   ├── api/                    # API integration (Axios)
│   ├── components/             # Reusable UI components
│   ├── context/                # Global state (AuthContext)
│   ├── Features/               # Feature-based modules
│   │   ├── Admin/              # Admin pages & components
│   │   ├── Manager/            # Manager pages & components
│   │   └── Public/             # Public/Guest pages
│   └── utils/                  # Helper functions & animations
├── backend/                    # Backend Source Code
│   ├── app/
│   │   ├── controllers/        # API Route handlers
│   │   ├── core/               # Config & Security
│   │   ├── models/             # Database Models
│   │   └── schemas/            # Pydantic Schemas
│   ├── main.py                 # App Entry Point
│   └── seed.py                 # Data Seeding Script
└── README.md                   # Project Documentation
```

---

## ⚡ Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### 1. Backend Setup

It is **highly recommended** to use a virtual environment for the backend to avoid dependency conflicts.

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Create a virtual environment (if not already created)
python3 -m venv ../venv

# 3. Activate the virtual environment
# On Linux/macOS:
source ../venv/bin/activate
# On Windows:
# ..\venv\Scripts\activate

# 4. Install dependencies
pip install -r requirements.txt
pip install pydantic-settings  # Ensure this is installed

# 5. Seed the Database (Optional but Recommended)
# This creates the database and populates it with demo data (Admin, Managers, Hotels, Rooms)
python seed.py

# 6. Run the Server
uvicorn main:app --reload --port 8000
```

The backend API will be available at `http://localhost:8000`.
Interactive API Docs: `http://localhost:8000/docs`

### 2. Frontend Setup

Open a new terminal window.

```bash
# 1. Navigate to the project root
cd Hotel-Management-System

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

## 🔑 Default Demo Accounts

After running the `seed.py` script, you can use these credentials to log in:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@example.com` | `admin123` |
| **Manager** | `manager@example.com` | `manager123` |
| **Guest** | `guest@example.com` | `guest123` |

---

## 🧪 Troubleshooting

### White Screen on Frontend?
- Ensure the backend is running on port 8000.
- Check the browser console (F12) for errors.
- Verify that `src/api/axiosClient.js` is pointing to the correct backend URL.

### 422 Validation Error?
- This usually means the data sent from the frontend doesn't match what the backend expects.
- Check the network tab in browser dev tools to see the exact error message from the server.

### "ModuleNotFoundError" in Backend?
- Make sure you have activated your virtual environment (`source ../venv/bin/activate`) before running python commands.

---

## 📄 License

This project is open-source and available under the MIT License.
