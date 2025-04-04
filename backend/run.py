
"""
Entry point for running the application
"""
from app import app
from config import HOST, PORT
import logging

# Set up more detailed logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

if __name__ == "__main__":
    print(f"Starting server on {HOST}:{PORT}")
    print(f"Debug mode: {True}")
    print(f"CORS: Enabled for all origins (debug mode)")
    app.run(host=HOST, port=PORT, debug=True, threaded=True)
