
"""
Entry point for running the application
"""
from app import app
from config import HOST, PORT

if __name__ == "__main__":
    print(f"Starting server on {HOST}:{PORT}")
    app.run(host=HOST, port=PORT, debug=True)
