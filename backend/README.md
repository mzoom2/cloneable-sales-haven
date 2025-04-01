
# Backend API for Phone Store Admin Panel

This is a simple Flask API that provides endpoints for managing stock items and store settings for the phone store admin panel.

## Setup Instructions

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the application:
   ```
   python app.py
   ```

The server will run on http://localhost:5000

## API Endpoints

### Stock Items

- `GET /api/stock` - Get all stock items
- `GET /api/stock/<id>` - Get a specific stock item
- `PUT /api/stock/<id>` - Update a stock item

### Store Settings

- `GET /api/settings` - Get store settings
- `PUT /api/settings` - Update store settings

## Database

The application uses SQLite by default, but can be configured to use other databases by setting the `DATABASE_URL` environment variable.
