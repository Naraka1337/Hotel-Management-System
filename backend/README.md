# Hotel Management Backend

FastAPI backend for the Hotel Management System.

## Setup

1. Create virtual environment:
```bash
python3 -m venv venv
```

2. Activate virtual environment:
```bash
# On Linux/Mac:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the server:
```bash
./venv/bin/python -m uvicorn main:app --reload --port 8000
```

**Note:** This method works in any shell (bash, fish, zsh, etc.) without needing to activate the virtual environment.

The API will be available at `http://localhost:8000`

API documentation: `http://localhost:8000/docs`

## Quick Start (All in one)

```bash
# Create venv, install dependencies, and run
python3 -m venv venv
./venv/bin/pip install -r requirements.txt
./venv/bin/python -m uvicorn main:app --reload --port 8000
```

## Database

SQLite database (`hotel.db`) will be created automatically on first run.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Public
- `GET /api/public/hotels` - List all hotels
- `GET /api/public/hotels/{hotel_id}` - Get hotel details
- `GET /api/public/hotels/{hotel_id}/rooms` - Get available rooms
- `POST /api/public/bookings` - Create booking

### Manager
- `GET /api/manager/dashboard` - Manager dashboard
- `GET /api/manager/rooms` - List manager's rooms
- `POST /api/manager/rooms` - Create room

### Admin
- `GET /api/admin/dashboard` - Admin dashboard
- `GET /api/admin/hotels` - List all hotels
- `GET /api/admin/users` - List all users

