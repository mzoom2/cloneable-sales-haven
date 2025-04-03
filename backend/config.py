
"""
Configuration module for the backend application.
"""
import os

# Default to "0.0.0.0" for production environments, localhost for development
HOST = os.environ.get("BACKEND_HOST", "0.0.0.0")

# Default to port 5000, but allow override via environment variable
PORT = int(os.environ.get("BACKEND_PORT", 5000))

# CORS settings - allowed origins
# Default to localhost and the development origin, but can be overridden
DEFAULT_ORIGINS = [
    "http://localhost:3000",  # Default frontend dev server
    "http://localhost:5173",  # Vite default
    "https://yourdomain.com"  # Replace with your production domain
]
ALLOWED_ORIGINS = os.environ.get("ALLOWED_ORIGINS", ",".join(DEFAULT_ORIGINS)).split(",")

# Database configuration
DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///store_data.db")

# Secret key for session
SESSION_SECRET = os.environ.get("SESSION_SECRET", "dev_secret_key")
