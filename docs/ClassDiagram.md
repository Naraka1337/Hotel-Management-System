# Hotel Management System - Class Diagram

## Overview

This document provides a comprehensive class diagram for the Hotel Management System, covering both the backend (Python/FastAPI) and frontend (React) class structures.

---

## Complete System Class Diagram

```mermaid
classDiagram
    direction TB
    
    %% ===== ENUMS =====
    class UserRole {
        <<enumeration>>
        ADMIN
        MANAGER
        GUEST
    }

    %% ===== MODEL CLASSES (SQLAlchemy) =====
    class User {
        +int id
        +str email
        +str hashed_password
        +str full_name
        +str role
        +bool is_active
        +List~Hotel~ managed_hotels
        +List~Booking~ bookings
    }

    class Hotel {
        +int id
        +str name
        +str location
        +str description
        +str image_url
        +int manager_id
        +User manager
        +List~Room~ rooms
    }

    class Room {
        +int id
        +int hotel_id
        +str room_number
        +str type
        +float price
        +int capacity
        +bool is_available
        +str description
        +Hotel hotel
        +List~Booking~ bookings
    }

    class Booking {
        +int id
        +int user_id
        +int room_id
        +date check_in
        +date check_out
        +float total_price
        +str status
        +User user
        +Room room
    }

    %% ===== RELATIONSHIPS =====
    User "1" --> "*" Hotel : manages
    User "1" --> "*" Booking : makes
    Hotel "1" --> "*" Room : contains
    Room "1" --> "*" Booking : has
    User --> UserRole : has role
```

---

## Backend Classes

### Model Layer (SQLAlchemy ORM)

```mermaid
classDiagram
    direction LR
    
    class Base {
        <<abstract>>
        +metadata
    }

    class User {
        +int id
        +str email
        +str hashed_password
        +str full_name
        +str role
        +bool is_active
    }

    class Hotel {
        +int id
        +str name
        +str location
        +str description
        +str image_url
        +int manager_id
        +relationship manager
        +relationship rooms
    }

    class Room {
        +int id
        +int hotel_id
        +str room_number
        +str type
        +float price
        +int capacity
        +bool is_available
        +str description
        +relationship hotel
    }

    class Booking {
        +int id
        +int user_id
        +int room_id
        +date check_in
        +date check_out
        +float total_price
        +str status
        +relationship user
        +relationship room
    }

    Base <|-- User
    Base <|-- Hotel
    Base <|-- Room
    Base <|-- Booking
```

---

### Schema Layer (Pydantic DTOs)

```mermaid
classDiagram
    direction TB
    
    class BaseModel {
        <<Pydantic>>
    }

    %% User Schemas
    class UserBase {
        +EmailStr email
        +Optional~str~ full_name
        +str role = "guest"
    }

    class UserCreate {
        +str password
    }

    class UserUpdate {
        +Optional~EmailStr~ email
        +Optional~str~ full_name
        +Optional~str~ password
        +Optional~str~ role
        +Optional~bool~ is_active
    }

    class UserSchema {
        +int id
        +bool is_active
    }

    BaseModel <|-- UserBase
    UserBase <|-- UserCreate
    BaseModel <|-- UserUpdate
    UserBase <|-- UserSchema

    %% Room Schemas
    class RoomBase {
        +str room_number
        +str type
        +float price
        +int capacity = 1
        +Optional~str~ description
        +bool is_available = true
    }

    class RoomCreate {
        +int hotel_id
    }

    class RoomUpdate {
        +Optional~str~ room_number
        +Optional~str~ type
        +Optional~float~ price
        +Optional~int~ capacity
        +Optional~str~ description
        +Optional~bool~ is_available
    }

    class RoomSchema {
        +int id
        +int hotel_id
    }

    BaseModel <|-- RoomBase
    RoomBase <|-- RoomCreate
    BaseModel <|-- RoomUpdate
    RoomBase <|-- RoomSchema

    %% Hotel Schemas
    class HotelBase {
        +str name
        +str location
        +Optional~str~ description
        +Optional~str~ image_url
    }

    class HotelCreate {
        +int manager_id
    }

    class HotelUpdate {
        +Optional~str~ name
        +Optional~str~ location
        +Optional~str~ description
        +Optional~str~ image_url
        +Optional~int~ manager_id
    }

    class HotelSchema {
        +int id
        +int manager_id
        +List~RoomSchema~ rooms
        +price_per_night() float
        +city() str
        +rating() float
    }

    BaseModel <|-- HotelBase
    HotelBase <|-- HotelCreate
    BaseModel <|-- HotelUpdate
    HotelBase <|-- HotelSchema

    %% Booking Schemas
    class BookingBase {
        +int room_id
        +date check_in
        +date check_out
    }

    class BookingCreate {
    }

    class BookingSchema {
        +int id
        +int user_id
        +float total_price
        +str status
    }

    BaseModel <|-- BookingBase
    BookingBase <|-- BookingCreate
    BookingBase <|-- BookingSchema
```

---

### Controller Layer (FastAPI Routers)

```mermaid
classDiagram
    direction TB

    class APIRouter {
        <<FastAPI>>
        +prefix: str
        +tags: List~str~
        +include_router()
        +get()
        +post()
        +put()
        +delete()
    }

    class AuthController {
        <<Router: /api/auth>>
        +POST /register(user: UserCreate) UserSchema
        +POST /login(form_data: OAuth2PasswordRequestForm) Token
        +GET /me() UserSchema
        +get_current_user(token: str) User
    }

    class PublicController {
        <<Router: /api/public>>
        +GET /hotels() List~Hotel~
        +GET /hotels/{id}() Hotel
        +GET /hotels/{id}/rooms() List~Room~
    }

    class AdminController {
        <<Router: /api/admin>>
        +GET /users() List~User~
        +POST /users() User
        +PUT /users/{id}() User
        +DELETE /users/{id}() void
        +GET /hotels() List~Hotel~
        +POST /hotels() Hotel
        +PUT /hotels/{id}() Hotel
        +DELETE /hotels/{id}() void
        +GET /bookings() List~Booking~
    }

    class ManagerController {
        <<Router: /api/manager>>
        +GET /hotels() List~Hotel~
        +GET /rooms() List~Room~
        +POST /rooms() Room
        +PUT /rooms/{id}() Room
        +DELETE /rooms/{id}() void
        +GET /bookings() List~Booking~
    }

    APIRouter <|-- AuthController
    APIRouter <|-- PublicController
    APIRouter <|-- AdminController
    APIRouter <|-- ManagerController
```

---

### Core/Utility Classes

```mermaid
classDiagram
    direction LR

    class Settings {
        <<Pydantic BaseSettings>>
        +str PROJECT_NAME
        +str API_V1_STR
        +str DATABASE_URL
        +str SECRET_KEY
        +str ALGORITHM
        +int ACCESS_TOKEN_EXPIRE_MINUTES
    }

    class Database {
        <<Module>>
        +Engine engine
        +SessionLocal sessionmaker
        +Base declarative_base
        +get_db() Generator~Session~
    }

    class Security {
        <<Module>>
        +CryptContext pwd_context
        +verify_password(plain, hashed) bool
        +get_password_hash(password) str
        +create_access_token(data, expires) str
    }

    class OAuth2PasswordBearer {
        <<FastAPI Security>>
        +tokenUrl: str
        +__call__(request) str
    }

    Settings --> Database : configures
    Security --> Settings : uses
    AuthController --> OAuth2PasswordBearer : uses
    AuthController --> Security : uses
```

---

## Frontend Classes

### React Components & Context

```mermaid
classDiagram
    direction TB

    class AuthContext {
        <<React Context>>
        +User user
        +bool loading
        +login(email, password) Promise~User~
        +logout() void
    }

    class AuthProvider {
        <<React Component>>
        -User user
        -bool loading
        +initAuth()
        +login()
        +logout()
        +render() JSX
    }

    class useAuth {
        <<Custom Hook>>
        +returns AuthContext
    }

    AuthProvider --> AuthContext : provides
    useAuth --> AuthContext : consumes
```

---

### API Service Layer

```mermaid
classDiagram
    direction TB

    class AxiosClient {
        <<Axios Instance>>
        +baseURL: string
        +headers: object
        +interceptors.request
        +interceptors.response
    }

    class AuthAPI {
        <<Module>>
        +login(email, password) Promise~Token~
        +register(userData) Promise~User~
        +getCurrentUser() Promise~User~
        +logout() void
    }

    class AdminAPI {
        <<Module>>
        +getUsers() Promise~User[]~
        +createUser(data) Promise~User~
        +updateUser(id, data) Promise~User~
        +deleteUser(id) Promise~void~
        +getHotels() Promise~Hotel[]~
        +createHotel(data) Promise~Hotel~
        +updateHotel(id, data) Promise~Hotel~
        +deleteHotel(id) Promise~void~
    }

    class ManagerAPI {
        <<Module>>
        +getMyHotels() Promise~Hotel[]~
        +getRooms() Promise~Room[]~
        +createRoom(data) Promise~Room~
        +updateRoom(id, data) Promise~Room~
        +deleteRoom(id) Promise~void~
    }

    class PublicAPI {
        <<Module>>
        +getHotels() Promise~Hotel[]~
        +getHotelById(id) Promise~Hotel~
        +getHotelRooms(id) Promise~Room[]~
    }

    AxiosClient <-- AuthAPI : uses
    AxiosClient <-- AdminAPI : uses
    AxiosClient <-- ManagerAPI : uses
    AxiosClient <-- PublicAPI : uses
```

---

## Class Relationships Summary

```mermaid
flowchart TB
    subgraph Backend["Backend (Python)"]
        subgraph Models["Models (SQLAlchemy)"]
            M1[User]
            M2[Hotel]
            M3[Room]
            M4[Booking]
        end
        
        subgraph Schemas["Schemas (Pydantic)"]
            S1[UserBase/Create/Update/Schema]
            S2[HotelBase/Create/Update/Schema]
            S3[RoomBase/Create/Update/Schema]
            S4[BookingBase/Create/Schema]
        end
        
        subgraph Controllers["Controllers (FastAPI)"]
            C1[AuthController]
            C2[PublicController]
            C3[AdminController]
            C4[ManagerController]
        end
        
        subgraph Core["Core"]
            X1[Settings]
            X2[Database]
            X3[Security]
        end
    end
    
    subgraph Frontend["Frontend (React)"]
        subgraph Components["Components"]
            F1[Pages/Features]
            F2[Shared Components]
        end
        
        subgraph State["State Management"]
            F3[AuthContext]
            F4[AuthProvider]
        end
        
        subgraph Services["API Services"]
            F5[AxiosClient]
            F6[API Modules]
        end
    end
    
    Controllers --> Models
    Controllers --> Schemas
    Controllers --> Core
    Services --> Controllers
    Components --> State
    Components --> Services
```

---

## Entity Attribute Summary Table

| Class | Type | Attributes | Methods |
|-------|------|------------|---------|
| **User** | Model | id, email, hashed_password, full_name, role, is_active | - |
| **Hotel** | Model | id, name, location, description, image_url, manager_id | - |
| **Room** | Model | id, hotel_id, room_number, type, price, capacity, is_available, description | - |
| **Booking** | Model | id, user_id, room_id, check_in, check_out, total_price, status | - |
| **HotelSchema** | Schema | (inherits HotelBase) + id, manager_id, rooms | price_per_night(), city(), rating() |
| **Settings** | Config | PROJECT_NAME, DATABASE_URL, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES | - |
| **Security** | Utility | pwd_context | verify_password(), get_password_hash(), create_access_token() |
| **AuthContext** | Context | user, loading | login(), logout() |
| **AxiosClient** | Service | baseURL, headers | request interceptor, response interceptor |

---

## Design Patterns in Classes

| Pattern | Implementation | Classes Involved |
|---------|----------------|------------------|
| **Inheritance** | Schema hierarchy (Base → Create/Update/Schema) | All Pydantic schemas |
| **Composition** | Models contain relationships to other models | Hotel → Rooms, User → Bookings |
| **Singleton** | Settings instance, Database engine | `settings`, `engine` |
| **Factory** | Session factory for database connections | `SessionLocal` |
| **Provider** | React Context Provider pattern | `AuthProvider` |
| **Facade** | API service modules abstract HTTP calls | AuthAPI, AdminAPI, etc. |

---

## MVC Architecture Pattern

This section shows how the Hotel Management System implements the **Model-View-Controller (MVC)** architectural pattern across both backend and frontend.

### MVC Overview Diagram

```mermaid
classDiagram
    direction TB
    
    %% ===== MVC LAYERS =====
    namespace Model {
        class UserModel {
            <<SQLAlchemy>>
            +int id
            +str email
            +str hashed_password
            +str full_name
            +str role
            +bool is_active
        }
        
        class HotelModel {
            <<SQLAlchemy>>
            +int id
            +str name
            +str location
            +str description
            +int manager_id
            +List~Room~ rooms
        }
        
        class RoomModel {
            <<SQLAlchemy>>
            +int id
            +int hotel_id
            +str room_number
            +str type
            +float price
            +int capacity
            +bool is_available
        }
        
        class BookingModel {
            <<SQLAlchemy>>
            +int id
            +int user_id
            +int room_id
            +date check_in
            +date check_out
            +float total_price
            +str status
        }
    }
    
    namespace View {
        class UserSchema {
            <<Pydantic DTO>>
            +int id
            +str email
            +str full_name
            +str role
            +bool is_active
        }
        
        class HotelSchema {
            <<Pydantic DTO>>
            +int id
            +str name
            +str location
            +List~RoomSchema~ rooms
        }
        
        class RoomSchema {
            <<Pydantic DTO>>
            +int id
            +str room_number
            +float price
            +bool is_available
        }
        
        class BookingSchema {
            <<Pydantic DTO>>
            +int id
            +date check_in
            +date check_out
            +float total_price
            +str status
        }
    }
    
    namespace Controller {
        class AuthController {
            <<FastAPI Router>>
            +POST /register()
            +POST /login()
            +GET /me()
        }
        
        class AdminController {
            <<FastAPI Router>>
            +GET /dashboard()
            +CRUD /users()
            +CRUD /hotels()
        }
        
        class ManagerController {
            <<FastAPI Router>>
            +GET /hotels()
            +CRUD /rooms()
            +GET /bookings()
        }
        
        class PublicController {
            <<FastAPI Router>>
            +GET /hotels()
            +GET /hotels/id()
            +GET /hotels/id/rooms()
        }
    }
    
    %% MVC Relationships
    AuthController --> UserModel : reads/writes
    AuthController --> UserSchema : returns
    
    AdminController --> UserModel : manages
    AdminController --> HotelModel : manages
    AdminController --> UserSchema : returns
    AdminController --> HotelSchema : returns
    
    ManagerController --> HotelModel : reads
    ManagerController --> RoomModel : manages
    ManagerController --> BookingModel : reads
    ManagerController --> RoomSchema : returns
    
    PublicController --> HotelModel : reads
    PublicController --> RoomModel : reads
    PublicController --> HotelSchema : returns
    PublicController --> RoomSchema : returns
```

---

### Frontend MVC Pattern

```mermaid
classDiagram
    direction TB
    
    %% ===== FRONTEND MVC =====
    namespace Model_State {
        class AuthContext {
            <<React Context>>
            +User user
            +bool loading
            +login()
            +logout()
        }
        
        class ReactQueryCache {
            <<TanStack Query>>
            +hotels: Hotel[]
            +rooms: Room[]
            +bookings: Booking[]
        }
    }
    
    namespace View_Components {
        class HotelCard {
            <<React Component>>
            +props: Hotel
            +render() JSX
        }
        
        class BookingForm {
            <<React Component>>
            +props: Room
            +onSubmit()
            +render() JSX
        }
        
        class AdminDashboard {
            <<React Page>>
            +stats: DashboardData
            +render() JSX
        }
        
        class HotelList {
            <<React Page>>
            +hotels: Hotel[]
            +render() JSX
        }
        
        class LoginForm {
            <<React Component>>
            +onLogin()
            +render() JSX
        }
    }
    
    namespace Controller_Services {
        class AuthAPI {
            <<API Service>>
            +login(email, password)
            +register(userData)
            +getCurrentUser()
            +logout()
        }
        
        class AdminAPI {
            <<API Service>>
            +getUsers()
            +createUser()
            +updateUser()
            +deleteUser()
            +getHotels()
            +createHotel()
        }
        
        class ManagerAPI {
            <<API Service>>
            +getMyHotels()
            +getRooms()
            +createRoom()
            +updateRoom()
            +deleteRoom()
        }
        
        class PublicAPI {
            <<API Service>>
            +getHotels()
            +getHotelById()
            +getHotelRooms()
        }
        
        class AxiosClient {
            <<HTTP Client>>
            +baseURL: string
            +interceptors
            +get()
            +post()
            +put()
            +delete()
        }
    }
    
    %% Frontend MVC Relationships
    LoginForm --> AuthAPI : calls
    AuthAPI --> AuthContext : updates
    AuthAPI --> AxiosClient : uses
    
    HotelList --> PublicAPI : fetches
    PublicAPI --> ReactQueryCache : caches
    PublicAPI --> AxiosClient : uses
    
    AdminDashboard --> AdminAPI : fetches
    AdminAPI --> AxiosClient : uses
    
    HotelCard --> ReactQueryCache : reads
    BookingForm --> ManagerAPI : submits
```

---

### MVC Data Flow

```mermaid
flowchart LR
    subgraph Frontend["Frontend (React)"]
        V1[View: React Components]
        C1[Controller: API Services]
        M1[Model: AuthContext/Cache]
    end
    
    subgraph Backend["Backend (FastAPI)"]
        C2[Controller: Routers]
        M2[Model: SQLAlchemy]
        V2[View: Pydantic Schemas]
    end
    
    subgraph Database["Database"]
        DB[(SQLite)]
    end
    
    V1 -->|User Action| C1
    C1 -->|HTTP Request| C2
    C2 -->|Query| M2
    M2 -->|CRUD| DB
    DB -->|Data| M2
    M2 -->|ORM Object| C2
    C2 -->|Serialize| V2
    V2 -->|JSON Response| C1
    C1 -->|Update| M1
    M1 -->|State Change| V1
```

---

### MVC Component Mapping

| Layer | Backend Component | Frontend Component | File Location |
|-------|-------------------|-------------------|---------------|
| **Model** | `User`, `Hotel`, `Room`, `Booking` | `AuthContext`, React Query Cache | `backend/app/models/` ↔ `src/context/` |
| **View** | Pydantic Schemas (DTOs) | React Components | `backend/app/schemas/` ↔ `src/Features/`, `src/components/` |
| **Controller** | FastAPI Routers | API Service Modules | `backend/app/controllers/` ↔ `src/api/` |

---

### MVC Responsibilities

```mermaid
flowchart TB
    subgraph Model["MODEL - Data Layer"]
        M1["• Database entities (SQLAlchemy ORM)"]
        M2["• Business logic & validation"]
        M3["• Data relationships"]
        M4["• State management (React Context)"]
    end
    
    subgraph View["VIEW - Presentation Layer"]
        V1["• API response formatting (Pydantic)"]
        V2["• UI rendering (React Components)"]
        V3["• User interface elements"]
        V4["• Display formatting"]
    end
    
    subgraph Controller["CONTROLLER - Logic Layer"]
        C1["• Request handling (FastAPI)"]
        C2["• Authentication & Authorization"]
        C3["• API calls (axios services)"]
        C4["• Event handlers"]
    end
    
    Model --> Controller
    Controller --> View
    View --> Controller
    Controller --> Model
```

