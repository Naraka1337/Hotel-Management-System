# Hotel Management System - System Architecture

## Overview

The Hotel Management System is a full-stack web application that follows a **Client-Server Architecture** with clear separation of concerns. The system employs multiple architectural patterns to ensure maintainability, scalability, and security.

---

## High-Level Architecture

```mermaid
flowchart TB
    subgraph Client["🖥️ Client Layer (Browser)"]
        UI[React SPA]
        CTX[Context API]
        API[Axios HTTP Client]
    end

    subgraph Server["⚙️ Server Layer"]
        FW[FastAPI Framework]
        CTRL[Controllers / Routers]
        SVC[Business Logic]
        SEC[Security Middleware]
    end

    subgraph Data["💾 Data Layer"]
        ORM[SQLAlchemy ORM]
        DB[(SQLite Database)]
    end

    UI --> CTX
    CTX --> API
    API <-->|REST API / JSON| FW
    FW --> SEC
    SEC --> CTRL
    CTRL --> SVC
    SVC --> ORM
    ORM --> DB
```

---

## Applied Architectural Patterns

### 1. 🏗️ Layered (N-Tier) Architecture

The system is organized into distinct layers with clear responsibilities:

```mermaid
flowchart LR
    subgraph Presentation["Presentation Layer"]
        A[React Components]
        B[Pages/Views]
    end
    
    subgraph Application["Application Layer"]
        C[API Services]
        D[Context State]
    end
    
    subgraph Business["Business Layer"]
        E[Controllers]
        F[Schemas/Validation]
    end
    
    subgraph DataAccess["Data Access Layer"]
        G[ORM Models]
        H[Database]
    end
    
    Presentation --> Application
    Application --> Business
    Business --> DataAccess
```

| Layer | Technology | Responsibility |
|-------|------------|----------------|
| **Presentation** | React + Vite | User interface, user interaction |
| **Application** | Context API, Axios | State management, API communication |
| **Business** | FastAPI Controllers | Request handling, business rules |
| **Data Access** | SQLAlchemy ORM | Data persistence, database operations |

---

### 2. 🔀 MVC Pattern (Model-View-Controller)

The backend strictly follows the MVC pattern:

```mermaid
flowchart LR
    subgraph View["View (Frontend)"]
        V[React Components]
    end
    
    subgraph Controller["Controller"]
        C1[auth.py]
        C2[admin.py]
        C3[manager.py]
        C4[public.py]
    end
    
    subgraph Model["Model"]
        M1[user.py]
        M2[hotel.py]
        M3[booking.py]
    end
    
    V <-->|HTTP/JSON| Controller
    Controller <--> Model
```

**Backend Structure:**
```
backend/
├── app/
│   ├── controllers/     # Controllers (Route handlers)
│   │   ├── auth.py      # Authentication endpoints
│   │   ├── admin.py     # Admin operations
│   │   ├── manager.py   # Manager operations
│   │   └── public.py    # Public endpoints
│   ├── models/          # Models (Database entities)
│   │   ├── user.py
│   │   ├── hotel.py
│   │   └── booking.py
│   ├── schemas/         # Data Transfer Objects (DTOs)
│   │   ├── user.py
│   │   ├── hotel.py
│   │   └── booking.py
│   └── core/            # Core utilities
│       ├── config.py    # Configuration settings
│       ├── database.py  # Database connection
│       └── security.py  # Security utilities
```

---

### 3. 🌐 RESTful API Architecture

The backend exposes a RESTful API with resource-based endpoints:

```mermaid
flowchart TB
    subgraph API["REST API Endpoints"]
        direction LR
        AUTH["/api/auth/*"]
        PUB["/api/public/*"]
        ADMIN["/api/admin/*"]
        MGR["/api/manager/*"]
    end
    
    subgraph Methods["HTTP Methods"]
        GET[GET - Read]
        POST[POST - Create]
        PUT[PUT - Update]
        DELETE[DELETE - Delete]
    end
    
    Methods --> API
```

| Endpoint Prefix | Purpose | Access Level |
|-----------------|---------|--------------|
| `/api/auth` | Authentication (login, register) | Public |
| `/api/public` | Browse hotels, rooms | Public |
| `/api/admin` | User & system management | Admin only |
| `/api/manager` | Hotel & room management | Manager only |

---

### 4. 🔐 Role-Based Access Control (RBAC)

Security is implemented using JWT tokens with role-based permissions:

```mermaid
flowchart TB
    subgraph Auth["Authentication Flow"]
        A[Login Request] --> B[Validate Credentials]
        B --> C[Generate JWT Token]
        C --> D[Return Token to Client]
    end
    
    subgraph RBAC["Authorization Flow"]
        E[API Request + Token] --> F[Validate JWT]
        F --> G{Check Role}
        G -->|Admin| H[Full Access]
        G -->|Manager| I[Hotel Management]
        G -->|Guest| J[Booking Only]
    end
    
    Auth --> RBAC
```

**Security Components:**
- **Password Hashing**: Argon2 algorithm via `passlib`
- **Token Generation**: JWT with configurable expiration
- **Token Validation**: OAuth2 Bearer scheme

---

### 5. 📦 Component-Based Architecture (Frontend)

The React frontend follows a component-based architecture with feature organization:

```mermaid
flowchart TB
    subgraph App["Application Root"]
        Router[React Router]
    end
    
    subgraph Features["Feature Modules"]
        Auth[Auth Pages]
        Hotels[Hotel Pages]
        Booking[Booking Pages]
        Admin[Admin Dashboard]
        Manager[Manager Dashboard]
    end
    
    subgraph Shared["Shared Components"]
        Navbar[Navbar]
        Footer[Footer]
        Cards[Card Components]
    end
    
    subgraph State["State Management"]
        Context[AuthContext]
    end
    
    App --> Router
    Router --> Features
    Features --> Shared
    Features --> State
```

**Frontend Structure:**
```
src/
├── Features/           # Feature-based modules
│   ├── Auth/           # Login, Register pages
│   ├── Hotels/         # Hotel listing, details
│   ├── Booking/        # Booking functionality
│   ├── Admin/          # Admin dashboard
│   └── Manager/        # Manager dashboard
├── components/         # Shared/reusable components
├── context/            # React Context (AuthContext)
├── api/                # API service layer
│   ├── axiosClient.js  # Configured Axios instance
│   ├── auth.js         # Auth API calls
│   ├── admin.js        # Admin API calls
│   ├── manager.js      # Manager API calls
│   └── public.js       # Public API calls
├── config/             # App configuration
└── utils/              # Utility functions
```

---

### 6. 🔄 Dependency Injection Pattern

FastAPI's dependency injection system is used throughout the backend:

```python
# Database session injection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Usage in controllers
@router.get("/hotels")
def get_hotels(db: Session = Depends(get_db)):
    return db.query(Hotel).all()

# Authentication dependency
@router.get("/me")
def get_current_user(token: str = Depends(oauth2_scheme)):
    # Token validation logic
```

---

## Technology Stack

```mermaid
flowchart LR
    subgraph Frontend["Frontend Stack"]
        R[React 18]
        V[Vite]
        RR[React Router]
        AX[Axios]
        TW[Tailwind CSS]
    end
    
    subgraph Backend["Backend Stack"]
        FA[FastAPI]
        SA[SQLAlchemy]
        PY[Python 3.x]
        UV[Uvicorn]
    end
    
    subgraph Database["Database"]
        SQ[(SQLite)]
    end
    
    Frontend <-->|REST API| Backend
    Backend <--> Database
```

| Component | Technology | Version |
|-----------|------------|---------|
| **Frontend Framework** | React | 18.x |
| **Build Tool** | Vite | 5.x |
| **Styling** | Tailwind CSS | 3.x |
| **HTTP Client** | Axios | - |
| **Backend Framework** | FastAPI | - |
| **ORM** | SQLAlchemy | - |
| **Database** | SQLite | 3.x |
| **Auth** | JWT (python-jose) | - |
| **Password Hashing** | Argon2 (passlib) | - |

---

## Data Flow Diagram

```mermaid
sequenceDiagram
    participant U as User/Browser
    participant R as React App
    participant A as Axios Client
    participant F as FastAPI
    participant C as Controller
    participant M as Model/ORM
    participant D as SQLite DB

    U->>R: User Action (e.g., Login)
    R->>A: API Call
    A->>A: Add Auth Token (Interceptor)
    A->>F: HTTP Request
    F->>F: CORS Validation
    F->>C: Route to Controller
    C->>C: Validate Input (Pydantic)
    C->>M: Database Operation
    M->>D: SQL Query
    D-->>M: Query Result
    M-->>C: ORM Objects
    C-->>F: Response Data
    F-->>A: JSON Response
    A->>A: Error Handling (Interceptor)
    A-->>R: Response Data
    R-->>U: Update UI
```

---

## Security Architecture

```mermaid
flowchart TB
    subgraph Client["Client Security"]
        LS[LocalStorage Token]
        INT[Axios Interceptors]
    end
    
    subgraph Transport["Transport Security"]
        CORS[CORS Policy]
        HTTPS[HTTPS Ready]
    end
    
    subgraph Server["Server Security"]
        JWT[JWT Validation]
        RBAC[Role-Based Access]
        HASH[Argon2 Hashing]
    end
    
    Client --> Transport
    Transport --> Server
```

| Security Feature | Implementation |
|------------------|----------------|
| **Authentication** | JWT Bearer Tokens |
| **Authorization** | Role-based (Admin, Manager, Guest) |
| **Password Storage** | Argon2 hashing |
| **API Security** | CORS whitelist, Authorization headers |
| **Token Storage** | Browser LocalStorage |
| **Session Management** | Stateless (token-based) |

---

## Summary of Patterns

| Pattern | Where Used | Benefit |
|---------|------------|---------|
| **Layered Architecture** | Full Stack | Separation of concerns |
| **MVC** | Backend | Clear responsibility division |
| **REST API** | Backend | Standard, scalable API design |
| **Component-Based** | Frontend | Reusability, maintainability |
| **Context Pattern** | Frontend | Centralized state management |
| **Dependency Injection** | Backend | Testability, loose coupling |
| **Repository Pattern** | ORM Layer | Data access abstraction |
| **RBAC** | Auth System | Secure access control |
