from flask import Flask, Blueprint, request, jsonify, send_file
from flask_login import login_required
from dotenv import load_dotenv
from Backend.models import db, SensorData
from datetime import datetime
import csv
import io
import logging

load_dotenv()

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

data_blueprint = Blueprint('data', __name__)

# Route to insert data into the database
@data_blueprint.route('/insert', methods=['POST'])
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

# Route to fetch data within a specified date range (requires login)
@data_blueprint.route('/range', methods=['GET'])
@login_required
def get_data_range():
    start_date_str = request.args.get('start')
    end_date_str = request.args.get('end')

    logger.debug(f"Received start date: {start_date_str}")
    logger.debug(f"Received end date: {end_date_str}")

    if not start_date_str or not end_date_str:
        return jsonify({"message": "Invalid date range"}), 400

    try:
        # Remove the 'Z' character from the end of the date string
        start_date = datetime.fromisoformat(start_date_str.replace('Z', ''))
        end_date = datetime.fromisoformat(end_date_str.replace('Z', ''))
    except ValueError as e:
        logger.error(f"Date parsing error: {e}")
        return jsonify({"message": "Invalid date format"}), 400

    data = SensorData.query.filter(SensorData.timestamp >= start_date, SensorData.timestamp <= end_date).all()
    result = [{"id": d.id, "temperature": d.temperature, "pressure": d.pressure, "timestamp": d.timestamp} for d in data]
    return jsonify(result)

# Route to download data as CSV
@data_blueprint.route('/download', methods=['GET'])
@login_required
def download_data():
    start_date = request.args.get('start')
    end_date = request.args.get('end')

    logger.debug(f"Received start date: {start_date}")
    logger.debug(f"Received end date: {end_date}")

    if not start_date or not end_date:
        return jsonify({"message": "Invalid date range"}), 400

    try:
        # Remove the 'Z' character from the end of the date string
        start_date = datetime.fromisoformat(start_date.replace('Z', ''))
        end_date = datetime.fromisoformat(end_date.replace('Z', ''))
    except ValueError as e:
        logger.error(f"Date parsing error: {e}")
        return jsonify({"message": "Invalid date format"}), 400

    # Fetch data from the database
    data = SensorData.query.filter(SensorData.timestamp >= start_date, SensorData.timestamp <= end_date).all()

    # Create CSV
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(['Timestamp', 'Temperature', 'Pressure'])

    for entry in data:
        writer.writerow([entry.timestamp, entry.temperature, entry.pressure])

    output.seek(0)

    return send_file(output, mimetype='text/csv', as_attachment=True, attachment_filename='data.csv')

app.register_blueprint(data_blueprint, url_prefix='/data')

if __name__ == '__main__':
    app.run(debug=True)