from flask import Blueprint, request, jsonify
from flask_login import login_required
from dotenv import load_dotenv
from Backend.models import db, SensorData
import os

load_dotenv()

data_blueprint = Blueprint('data', __name__)

# Route to insert data into the database (requires login)
@data_blueprint.route('/insert', methods=['POST'])
@login_required
def insert_data():
    data = request.json
    temperature = data.get('temperature')
    pressure = data.get('pressure')

    if temperature is None or pressure is None:
        return jsonify({"message": "Invalid input"}), 400

    new_data = SensorData(temperature=temperature, pressure=pressure)
    db.session.add(new_data)
    db.session.commit()

    return jsonify({"message": "Data inserted successfully"}), 201

# Route to fetch data from the database (requires login)
@data_blueprint.route('/data', methods=['GET'])
@login_required
def get_data():
    data = SensorData.query.all()
    result = [{"id": d.id, "temperature": d.temperature, "pressure": d.pressure, "timestamp": d.timestamp} for d in data]
    return jsonify(result)