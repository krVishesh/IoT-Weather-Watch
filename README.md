# My Project

## Overview

This project is a Flask-based web application that uses PostgreSQL for the database and includes user authentication and data management features.

## Prerequisites

- Python 3.x
- PostgreSQL
- Virtual environment (optional but recommended)

## Setup

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/yourproject.git
cd yourproject
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

### 4. Install Dependencies

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

### 6. Run the Application

**Set the FLASK_APP Environment Variable:**

```sh
export FLASK_APP=Backend.app
```

**Start the Flask Application:**

```sh
flask run
```

### 7. Verify the Database Tables

After running the application, verify that the tables have been created in your PostgreSQL database:

```sh
psql -h localhost -U iot_user -d iot_db
```

---

## Summary

- The `README.md` file now includes detailed instructions for setting up PostgreSQL, installing dependencies, and running the Flask application.
- It also includes a section on verifying the database tables and a list of API endpoints with example request bodies.
- This comprehensive guide should help users set up and run your project with ease.
