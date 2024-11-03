from flask import Flask, send_from_directory
from Backend.auth import auth_blueprint, bcrypt, login_manager
from Backend.data import data_blueprint
from Backend.models import db
from flask_cors import CORS
from dotenv import load_dotenv
import os
import logging
from flask_migrate import Migrate

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize Bcrypt, LoginManager, SQLAlchemy, and Flask-Migrate
bcrypt.init_app(app)
login_manager.init_app(app)
db.init_app(app)
migrate = Migrate(app, db)

# Register the blueprints
app.register_blueprint(auth_blueprint, url_prefix='/auth')
app.register_blueprint(data_blueprint, url_prefix='/data')

@app.route('/', methods=['GET'])
def serve_index():
    return send_from_directory('static', 'index.html')

@app.route('/<path:path>', methods=['GET'])
def handle_react_routes(path):
    return send_from_directory('static', 'index.html')

# Make sure you include /register as a catch-all to serve React routes
@app.route('/register', methods=['GET'])
@app.route('/login', methods=['GET'])
def serve_react_routes():
    return send_from_directory('static', 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)