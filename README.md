# My Project

## Overview

This project is a Flask-based web application that uses PostgreSQL for the database and includes user authentication and data management features. It also includes a frontend developed with React.

## Prerequisites

- Python 3.x
- PostgreSQL
- Virtual environment (optional but recommended)
- Node.js
- npm (Node Package Manager)

## Setup

### 1. Clone the Repository

```sh
git clone https://github.com/krVishesh/IoT-Weather-Watch.git
cd IoT-Weather-Watch
```

### 2. Set Up PostgreSQL

**Switch to the postgres User:**

```sh
sudo -i -u postgres
```

**Access the PostgreSQL Prompt:**

```sh
psql
```

**Create a New Database and User:**

```sql
CREATE DATABASE iot_db;
CREATE USER iot_user WITH PASSWORD 'new_password';
GRANT ALL PRIVILEGES ON DATABASE iot_db TO iot_user;
```

**Exit the PostgreSQL Prompt:**

```sh
\q
```

**Exit the postgres User:**

```sh
exit
```

### 3. Set Up the Virtual Environment

**Create a Virtual Environment:**

```sh
python3 -m venv .venv
```

**Activate the Virtual Environment:**

- **On Linux/macOS:**

  ```sh
  source .venv/bin/activate
  ```

- **On Windows:**

  ```sh
  .\venv\Scripts\activate
  ```

### 4. Install Flask Dependencies

```sh
pip install -r requirements.txt
```

### 5. Set Up Environment Variables

Create a `.env` file in the root directory of your project and add the following environment variables:

```
FLASK_SECRET_KEY=8tbeTK3nEwrfh8cmG2s1vlkhzvfxG5oeWWxRaQI7/y4=
DATABASE_URL=postgresql://iot_user:new_password@localhost/iot_db
FLASK_DB_USER=iot_user
FLASK_DB_USER_PASSWORD=new_password
FLASK_APP=Backend.app
```

### 6. Flask-Migrate Setup (Only for First Time Setup)

**Initialize Flask-Migrate:**

After activating the virtual environment, run:

```sh
flask db init
```

**Create Migrations:**

```sh
flask db migrate -m "Initial migration."
```

**Apply Migrations:**

```sh
flask db upgrade
```

### 7. Run the Flask Application

**Set the FLASK_APP Environment Variable:**

```sh
export FLASK_APP=Backend.app
```

**Start the Flask Application:**

```sh
flask run
```

### 8. Verify the Database Tables

After running the application, verify that the tables have been created in your PostgreSQL database:

```sh
psql -h localhost -U iot_user -d iot_db
```

### 9. Set Up the Frontend

Navigate to the frontend directory and install the dependencies:

```sh
cd frontend/my-app
npm install
```

### 10. Start the Development Server

```sh
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

---

## Summary

- The `README.md` now includes instructions for setting up both the Flask backend and the React frontend.
- It covers setting up PostgreSQL, creating a virtual environment, installing dependencies, running migrations, and starting both the backend and frontend servers.
- This guide provides a complete setup to run your project seamlessly.
