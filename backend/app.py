from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
import os
import logging
from datetime import datetime
import json

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

# Define PaymentSettings model for storing all payment methods
class PaymentSettings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    setting_type = db.Column(db.String(50), nullable=False)  # Type of payment setting
    settings_json = db.Column(db.Text, nullable=True)  # JSON string containing settings
    
    def to_dict(self):
        return {
            'id': self.id,
            'setting_type': self.setting_type,
            'settings_json': self.settings_json
        }

# Define new Order and Payment model
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100))
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default='pending')  # pending, paid, shipped, delivered
    tracking_number = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'total_amount': self.total_amount,
            'status': self.status,
            'tracking_number': self.tracking_number,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    stock_item_id = db.Column(db.Integer, db.ForeignKey('stock_item.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'stock_item_id': self.stock_item_id,
            'quantity': self.quantity,
            'price': self.price
        }

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    payment_method = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default='pending')  # pending, completed, failed
    transaction_id = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'payment_method': self.payment_method,
            'amount': self.amount,
            'status': self.status,
            'transaction_id': self.transaction_id,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

# API Routes for Stock Items
@app.route('/api/stock', methods=['GET'])
def get_stock_items():
    try:
        items = StockItem.query.all()
        return jsonify([item.to_dict() for item in items]), 200
    except Exception as e:
        logger.error(f"Error fetching stock items: {str(e)}")
        return jsonify({"error": "Failed to fetch stock items"}), 500

@app.route('/api/stock', methods=['POST'])
def add_stock_item():
    try:
        data = request.json
        
        new_item = StockItem(
            name=data.get('name'),
            price=data.get('price'),
            quantity=data.get('quantity'),
            grade=data.get('grade'),
            location=data.get('location')
        )
        
        db.session.add(new_item)
        db.session.commit()
        
        return jsonify(new_item.to_dict()), 201
    except Exception as e:
        logger.error(f"Error adding stock item: {str(e)}")
        db.session.rollback()
        return jsonify({"error": f"Failed to add stock item: {str(e)}"}), 500

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

@app.route('/api/payment-settings', methods=['GET'])
def get_payment_settings():
    try:
        # Create a response with all payment details
        response = {}
        
        # Get bank transfer details from StoreSettings
        bank_transfer = StoreSettings.query.first()
        if bank_transfer:
            response['bank_transfer'] = {
                'bankName': bank_transfer.bankName,
                'accountNumber': bank_transfer.accountNumber,
                'accountName': bank_transfer.accountName,
                'routingNumber': bank_transfer.routingNumber,
                'swiftCode': bank_transfer.swiftCode
            }
        
        # Get other payment settings from PaymentSettings
        payment_settings = PaymentSettings.query.all()
        for setting in payment_settings:
            if setting.settings_json:
                import json
                try:
                    response[setting.setting_type] = json.loads(setting.settings_json)
                except:
                    logger.error(f"Error parsing JSON for {setting.setting_type}")
        
        return jsonify(response), 200
    except Exception as e:
        logger.error(f"Error fetching payment settings: {str(e)}")
        return jsonify({"error": "Failed to fetch payment settings"}), 500

@app.route('/api/payment-settings', methods=['PUT'])
def update_payment_settings():
    try:
        data = request.json
        
        # Update bank transfer details in StoreSettings
        if 'bank_transfer' in data:
            bank_data = data['bank_transfer']
            settings = StoreSettings.query.first()
            if not settings:
                settings = StoreSettings()
                db.session.add(settings)
            
            if 'bankName' in bank_data:
                settings.bankName = bank_data['bankName']
            if 'accountNumber' in bank_data:
                settings.accountNumber = bank_data['accountNumber']
            if 'accountName' in bank_data:
                settings.accountName = bank_data['accountName']
            if 'routingNumber' in bank_data:
                settings.routingNumber = bank_data['routingNumber']
            if 'swiftCode' in bank_data:
                settings.swiftCode = bank_data['swiftCode']
        
        # Update other payment settings in PaymentSettings
        for key, value in data.items():
            if key != 'bank_transfer' and value:
                import json
                
                setting = PaymentSettings.query.filter_by(setting_type=key).first()
                if not setting:
                    setting = PaymentSettings(setting_type=key)
                    db.session.add(setting)
                
                setting.settings_json = json.dumps(value)
        
        db.session.commit()
        return jsonify({"message": "Payment settings updated successfully"}), 200
    except Exception as e:
        logger.error(f"Error updating payment settings: {str(e)}")
        db.session.rollback()
        return jsonify({"error": f"Failed to update payment settings: {str(e)}"}), 500

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

# New payment and order endpoints
@app.route('/api/orders', methods=['POST'])
def create_order():
    try:
        logger.debug("Received order creation request")
        
        # Log the raw request data for debugging
        request_data = request.get_data()
        logger.debug(f"Raw request data: {request_data}")
        
        try:
            # Try to parse the JSON data
            data = request.json
            logger.debug(f"Parsed order data: {json.dumps(data)}")
        except Exception as e:
            logger.error(f"Failed to parse JSON data: {str(e)}")
            return jsonify({"error": f"Invalid JSON format: {str(e)}"}), 400
        
        if not data:
            logger.error("No data provided in request")
            return jsonify({"error": "No data provided"}), 400
            
        # Extract and validate user_id
        user_id = data.get('user_id')
        if not user_id:
            logger.error("Missing user_id in order data")
            return jsonify({"error": "User ID is required"}), 400
            
        # Extract and validate total_amount
        total_amount = data.get('total_amount')
        if total_amount is None:
            logger.error("Missing total_amount in order data")
            return jsonify({"error": "Total amount is required"}), 400
            
        # Extract and validate items array
        items = data.get('items', [])
        if not items or len(items) == 0:
            logger.error("Missing items in order data")
            return jsonify({"error": "Order items are required"}), 400
        
        # Create new order
        order = Order(
            user_id=user_id,
            total_amount=total_amount,
            status='pending'
        )
        db.session.add(order)
        db.session.flush()  # Get the order ID
        logger.debug(f"Created order with ID: {order.id}")
        
        # Add order items
        for item in items:
            item_id = item.get('id')
            quantity = item.get('quantity')
            price = item.get('price')
            
            if item_id is None or quantity is None or price is None:
                logger.error(f"Invalid item data: {item}")
                db.session.rollback()
                return jsonify({"error": f"Invalid item data: {item}"}), 400
            
            # Verify item exists
            stock_item = StockItem.query.get(item_id)
            if not stock_item:
                logger.error(f"Stock item not found: {item_id}")
                db.session.rollback()
                return jsonify({"error": f"Stock item with ID {item_id} not found"}), 404
            
            order_item = OrderItem(
                order_id=order.id,
                stock_item_id=item_id,
                quantity=quantity,
                price=price
            )
            db.session.add(order_item)
            logger.debug(f"Added order item: {order_item.to_dict()}")
            
            # Update stock quantity
            if stock_item.quantity < quantity:
                logger.error(f"Insufficient stock for item {item_id}: {stock_item.quantity} < {quantity}")
                db.session.rollback()
                return jsonify({"error": f"Insufficient stock for item {stock_item.name}"}), 400
                
            stock_item.quantity -= quantity
            logger.debug(f"Updated stock quantity for item {item_id}: {stock_item.quantity}")
        
        db.session.commit()
        logger.info(f"Order created successfully with ID: {order.id}")
        return jsonify({"order_id": order.id}), 201
    except Exception as e:
        logger.error(f"Error creating order: {str(e)}")
        db.session.rollback()
        return jsonify({"error": f"Failed to create order: {str(e)}"}), 500

@app.route('/api/payments', methods=['POST'])
def create_payment():
    try:
        data = request.json
        order_id = data.get('order_id')
        payment_method = data.get('payment_method')
        amount = data.get('amount')
        
        if not all([order_id, payment_method, amount]):
            return jsonify({"error": "Missing required payment data"}), 400
        
        # Verify order exists
        order = Order.query.get(order_id)
        if not order:
            return jsonify({"error": "Order not found"}), 404
        
        # Create new payment
        payment = Payment(
            order_id=order_id,
            payment_method=payment_method,
            amount=amount,
            status='pending'
        )
        db.session.add(payment)
        db.session.commit()
        
        return jsonify(payment.to_dict()), 201
    except Exception as e:
        logger.error(f"Error creating payment: {str(e)}")
        db.session.rollback()
        return jsonify({"error": f"Failed to create payment: {str(e)}"}), 500

@app.route('/api/payments/<int:payment_id>/confirm', methods=['POST'])
def confirm_payment(payment_id):
    try:
        payment = Payment.query.get(payment_id)
        if not payment:
            return jsonify({"error": "Payment not found"}), 404
        
        payment.status = 'completed'
        
        # Update order status
        order = Order.query.get(payment.order_id)
        if order:
            order.status = 'paid'
            # Generate a tracking number
            order.tracking_number = f"UEP{order.id:08d}"
        
        db.session.commit()
        return jsonify({"message": "Payment confirmed", "tracking_number": order.tracking_number}), 200
    except Exception as e:
        logger.error(f"Error confirming payment: {str(e)}")
        db.session.rollback()
        return jsonify({"error": f"Failed to confirm payment: {str(e)}"}), 500

@app.route('/api/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    try:
        order = Order.query.get(order_id)
        if not order:
            return jsonify({"error": "Order not found"}), 404
        
        # Get order items
        order_items = OrderItem.query.filter_by(order_id=order_id).all()
        items = []
        for item in order_items:
            stock_item = StockItem.query.get(item.stock_item_id)
            items.append({
                "id": item.id,
                "stock_item_id": item.stock_item_id,
                "name": stock_item.name if stock_item else "Unknown",
                "quantity": item.quantity,
                "price": item.price
            })
        
        # Get payment
        payment = Payment.query.filter_by(order_id=order_id).first()
        
        result = {
            "order": order.to_dict(),
            "items": items,
            "payment": payment.to_dict() if payment else None
        }
        
        return jsonify(result), 200
    except Exception as e:
        logger.error(f"Error fetching order: {str(e)}")
        return jsonify({"error": f"Failed to fetch order: {str(e)}"}), 500

@app.route('/api/orders/by-user/<user_id>', methods=['GET'])
def get_orders_by_user(user_id):
    try:
        orders = Order.query.filter_by(user_id=user_id).all()
        return jsonify([order.to_dict() for order in orders]), 200
    except Exception as e:
        logger.error(f"Error fetching orders: {str(e)}")
        return jsonify({"error": f"Failed to fetch orders: {str(e)}"}), 500

@app.route('/api/orders/by-tracking/<tracking_number>', methods=['GET'])
def get_order_by_tracking(tracking_number):
    try:
        order = Order.query.filter_by(tracking_number=tracking_number).first()
        if not order:
            return jsonify({"error": "Order not found"}), 404
        
        # Get order items
        order_items = OrderItem.query.filter_by(order_id=order.id).all()
        items = []
        for item in order_items:
            stock_item = StockItem.query.get(item.stock_item_id)
            items.append({
                "id": item.id,
                "stock_item_id": item.stock_item_id,
                "name": stock_item.name if stock_item else "Unknown",
                "quantity": item.quantity,
                "price": item.price
            })
        
        # Get payment
        payment = Payment.query.filter_by(order_id=order.id).first()
        
        result = {
            "order": order.to_dict(),
            "items": items,
            "payment": payment.to_dict() if payment else None
        }
        
        return jsonify(result), 200
    except Exception as e:
        logger.error(f"Error fetching order: {str(e)}")
        return jsonify({"error": f"Failed to fetch order: {str(e)}"}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables
    app.run(debug=True, host='0.0.0.0', port=5000)
