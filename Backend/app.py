from flask import Flask, send_from_directory
from Backend.auth import auth_blueprint
from Backend.data import data_blueprint
from Backend.models import db
from Backend.extensions import bcrypt, login_manager  # Import extensions
from flask_cors import CORS
from dotenv import load_dotenv
import os
from flask_migrate import Migrate

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize Bcrypt, LoginManager, SQLAlchemy, and Flask-Migrate
bcrypt.init_app(app)
login_manager.init_app(app)
db.init_app(app)
migrate = Migrate(app, db)

# Register the blueprints
app.register_blueprint(auth_blueprint, url_prefix='/api/auth')
app.register_blueprint(data_blueprint, url_prefix='/api/data')

@app.route('/', methods=['GET'])
def serve_index():
    return send_from_directory('static', 'index.html')

@app.route('/<path:path>', methods=['GET'])
def handle_react_routes(path):
    return send_from_directory('static', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)