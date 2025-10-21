from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # Import the middleware
from backend.api.routes import router
from backend.core.config import load_env

load_env()

# --- Configuration for CORS ---
# You can get this from environment variables for production
# For Vite's default dev server: http://localhost:5173
# You can also use a wildcard "*" to allow all origins during development, 
# but be more specific in production.

# IMPORTANT: Include the port number of your React-Vite app
origins = [
    "http://localhost:5173",  # React-Vite Development Server
    "http://127.0.0.1:5173",  # Another way the browser might reference localhost
    # Add your production frontend URL here later
]
# -----------------------------

app = FastAPI(title="Local Travel Planner API")

# --- Add the CORS Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # The list of allowed origins
    allow_credentials=True,       # Allow cookies/authorization headers to be passed
    allow_methods=["*"],          # Allow all HTTP methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],          # Allow all headers
)
# -------------------------------

app.include_router(router)