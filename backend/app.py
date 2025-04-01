
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
import os
import logging
from datetime import datetime

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Define SQLAlchemy base class
class Base(DeclarativeBase):
    pass

# Initialize Flask app and database
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure the database
app.secret_key = os.environ.get("SESSION_SECRET", "dev_secret_key")
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL", "sqlite:///store_data.db")
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize SQLAlchemy with app
db = SQLAlchemy(model_class=Base)
db.init_app(app)

# Define StockItem model
class StockItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    grade = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'quantity': self.quantity,
            'grade': self.grade,
            'location': self.location
        }

# Define StoreSettings model
class StoreSettings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    bankName = db.Column(db.String(100))
    accountNumber = db.Column(db.String(50))
    accountName = db.Column(db.String(100))
    routingNumber = db.Column(db.String(50))
    swiftCode = db.Column(db.String(50))
    
    def to_dict(self):
        return {
            'bankName': self.bankName,
            'accountNumber': self.accountNumber,
            'accountName': self.accountName,
            'routingNumber': self.routingNumber,
            'swiftCode': self.swiftCode
        }

# API Routes
@app.route('/api/stock', methods=['GET'])
def get_stock_items():
    try:
        items = StockItem.query.all()
        return jsonify([item.to_dict() for item in items]), 200
    except Exception as e:
        logger.error(f"Error fetching stock items: {str(e)}")
        return jsonify({"error": "Failed to fetch stock items"}), 500

@app.route('/api/stock/<int:item_id>', methods=['GET'])
def get_stock_item(item_id):
    try:
        item = StockItem.query.get(item_id)
        if not item:
            return jsonify({"error": "Item not found"}), 404
        return jsonify(item.to_dict()), 200
    except Exception as e:
        logger.error(f"Error fetching stock item: {str(e)}")
        return jsonify({"error": "Failed to fetch stock item"}), 500

@app.route('/api/stock/<int:item_id>', methods=['PUT'])
def update_stock_item(item_id):
    try:
        item = StockItem.query.get(item_id)
        if not item:
            return jsonify({"error": "Item not found"}), 404
        
        data = request.json
        
        if 'price' in data:
            item.price = data['price']
        if 'quantity' in data:
            item.quantity = data['quantity']
        if 'name' in data:
            item.name = data['name']
        if 'grade' in data:
            item.grade = data['grade']
        if 'location' in data:
            item.location = data['location']
            
        db.session.commit()
        return jsonify(item.to_dict()), 200
    except Exception as e:
        logger.error(f"Error updating stock item: {str(e)}")
        db.session.rollback()
        return jsonify({"error": "Failed to update stock item"}), 500

@app.route('/api/settings', methods=['GET'])
def get_store_settings():
    try:
        # Get the first store settings or create a default one
        settings = StoreSettings.query.first()
        if not settings:
            settings = StoreSettings(
                bankName='',
                accountNumber='',
                accountName='',
                routingNumber='',
                swiftCode=''
            )
            db.session.add(settings)
            db.session.commit()
            
        return jsonify(settings.to_dict()), 200
    except Exception as e:
        logger.error(f"Error fetching store settings: {str(e)}")
        return jsonify({"error": "Failed to fetch store settings"}), 500

@app.route('/api/settings', methods=['PUT'])
def update_store_settings():
    try:
        settings = StoreSettings.query.first()
        if not settings:
            settings = StoreSettings()
            db.session.add(settings)
        
        data = request.json
        
        if 'bankName' in data:
            settings.bankName = data['bankName']
        if 'accountNumber' in data:
            settings.accountNumber = data['accountNumber']
        if 'accountName' in data:
            settings.accountName = data['accountName']
        if 'routingNumber' in data:
            settings.routingNumber = data['routingNumber']
        if 'swiftCode' in data:
            settings.swiftCode = data['swiftCode']
            
        db.session.commit()
        return jsonify(settings.to_dict()), 200
    except Exception as e:
        logger.error(f"Error updating store settings: {str(e)}")
        db.session.rollback()
        return jsonify({"error": "Failed to update store settings"}), 500

# Import stock items from the frontend data
@app.route('/api/import-stock', methods=['POST'])
def import_stock_items():
    try:
        # Clear existing stock items
        StockItem.query.delete()
        
        # Get stock items from request
        items = request.json
        
        # Add new stock items
        for item_data in items:
            item = StockItem(
                id=item_data.get('id'),
                name=item_data.get('name'),
                price=item_data.get('price'),
                quantity=item_data.get('quantity'),
                grade=item_data.get('grade'),
                location=item_data.get('location')
            )
            db.session.add(item)
            
        db.session.commit()
        return jsonify({"message": "Stock items imported successfully"}), 200
    except Exception as e:
        logger.error(f"Error importing stock items: {str(e)}")
        db.session.rollback()
        return jsonify({"error": f"Failed to import stock items: {str(e)}"}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables
    app.run(debug=True, host='0.0.0.0', port=5000)
