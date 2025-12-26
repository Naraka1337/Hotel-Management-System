from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base
from app.controllers import auth, public, admin, manager

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

# Set up CORS
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost",
    "https://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(public.router, prefix="/api/public", tags=["public"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])
app.include_router(manager.router, prefix="/api/manager", tags=["manager"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Hotel Management System API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
