# How to Run the Hotel Management System

This guide provides step-by-step instructions to set up and run the Hotel Management System (Backend & Frontend).

## Prerequisites
- **Python 3.8+** installed.
- **Node.js 16+** and **npm** installed.

---

## 1. Backend Setup (FastAPI)

The backend handles the API, database, and authentication.

1.  **Open a terminal** and navigate to the project root:
    ```bash
    cd c:\Users\mohan\OneDrive\Desktop\HotelsV2
    ```

2.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

3.  **Create and Activate Virtual Environment**:
    *   **Windows**:
        ```bash
        python -m venv venv
        ..\venv\Scripts\activate
        ```
    *   *Note: If you are in the root `HotelsV2` folder, the venv might be at `venv` (root) or `backend/venv`. Adjust path accordingly. The current setup seems to use a root-level `venv`.*
    *   **Correct Command from Root**:
        ```bash
        .\venv\Scripts\activate
        ```

4.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

5.  **Seed the Database** (Initial Setup):
    ```bash
    python seed.py
    ```

6.  **Run the Server**:
    ```bash
    python -m uvicorn main:app --reload --port 8000
    ```
    *   The API will be available at: [http://127.0.0.1:8000](http://127.0.0.1:8000)
    *   Interactive Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 2. Frontend Setup (React + Vite)

The frontend is the user interface.

1.  **Open a NEW terminal** (keep the backend running) and navigate to the project root:
    ```bash
    cd c:\Users\mohan\OneDrive\Desktop\HotelsV2
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
    *   The app will start at: [http://localhost:5173](http://localhost:5173) (or 5174/5175 if port is busy).
    *   Check the terminal output for the exact URL.

---

## 3. Accessing the Application

Open your browser and go to the Frontend URL (e.g., `http://localhost:5173`).

### Default Demo Accounts
| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@example.com` | `admin123` |
| **Manager** | `manager@example.com` | `manager123` |
| **Guest** | `guest@example.com` | `guest123` |

---

## 4. Running Tests

### Backend Tests (Pytest)
From the project root (with venv activated):
```bash
set PYTHONPATH=backend
pytest backend/tests
```

### Frontend Tests (Vitest)
From the project root:
```bash
npm test
```
