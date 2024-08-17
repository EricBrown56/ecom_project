import mysql.connector
from mysql.connector import Error
from flask import Flask, jsonify, request
from flask_marshmallow import Marshmallow
from marshmallow import fields, ValidationError
from flask_cors import CORS



# Flask application setup
app = Flask(__name__)
ma = Marshmallow(app)
CORS(app)

# Define the Customer schema
class CustomerSchema(ma.Schema):
    id = fields.String(required=False)
    customer_name = fields.String(required=True)
    email = fields.String(required=True)
    phone = fields.String(required=True)

    class Meta:
        fields = ("id", "name", "email", "phone")

customer_schema = CustomerSchema()
customers_schema = CustomerSchema(many=True)

# Database connection parameters
db_name = "ecom"
user = "root"
password = "Groovin"
host = "localhost"

def get_db_connection():
    try:
        # Attempting to establish a connection
        conn = mysql.connector.connect(
            database=db_name,
            user=user,
            password=password,
            host=host
        )

        # Check if the connection is successful
        if conn.is_connected():
            print("Connected to MySQL database successfully")
            return conn

    except Error as e:
        # Handling any connection errors
        print(f"Error: {e}")
        return None

@app.route('/customers', methods=['GET'])
def get_customers():
    try:
        # Establishing connection to the database
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor(dictionary=True)

        # SQL query to fetch all customers
        query = "SELECT * FROM Customers"

        # Executing the query
        cursor.execute(query)

        # Fetching the results and preparing for JSON response
        customers = cursor.fetchall()

        # Use Marshmallow to format the JSON response
        return customers_schema.jsonify(customers)

    except Error as e:
        # Handling any errors that occur during the process
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        # Closing the database connection
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/customers/<int:id>', methods=['GET'])
def get_customer(id):
    try:
        # Establishing connection to the database
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor(dictionary=True)

        # SQL query to fetch all customers
        customer_to_get = (id, )

        # Check if the customer exists in the database
        cursor.execute("SELECT * FROM Customers WHERE id = %s", customer_to_get)

        # Fetching the results and preparing for JSON response
        customer = cursor.fetchall()

        # Use Marshmallow to format the JSON response
        return customers_schema.jsonify(customer)

    except Error as e:
        # Handling any errors that occur during the process
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        # Closing the database connection
        if conn and conn.is_connected():
            cursor.close()
            conn.close()


@app.route('/customers', methods=['POST'])
def add_customer():
    try:
        # Validate and deserialize using Marshmallow input data sent by the client
        customer_data = customer_schema.load(request.json)
    except ValidationError as e:
        print(f"Error: {e}")
        return jsonify(e.messages), 400

    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor()

        # New customer details
        new_customer = (customer_data['name'], customer_data['email'], customer_data['phone'])

        # SQL query to add new customer
        query = "INSERT INTO Customers (name, email, phone) VALUES (%s, %s, %s)"

        # Executing the query
        cursor.execute(query, new_customer)
        conn.commit()

        # Successful addition of the new customer
        return jsonify({"message": "New customer added successfully"}), 201

    except Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/customers/<int:id>', methods=['PUT'])
def update_customer(id):
    try:
        # Validate and deserialize using Marshmallow input data sent by the client
        customer_data = customer_schema.load(request.json)
    except ValidationError as e:
        print(f"Error: {e}")
        return jsonify(e.messages), 400

    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor()

        # Updated customer details
        updated_customer = (customer_data['name'], customer_data['email'], customer_data['phone'], id)

        # SQL query to update the customer's details
        query = "UPDATE Customers SET name = %s, email = %s, phone = %s WHERE id = %s"

        # Executing the query
        cursor.execute(query, updated_customer)
        conn.commit()

        # Successful update of the new customer
        return jsonify({"message": "Customer details updated successfully"}), 200

    except Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        # Closing the database connection
        if conn and conn.is_connected():
            cursor.close()
            conn.close()


@app.route('/customers/<int:id>', methods=['DELETE'])
def delete_customer(id):
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor()
        customer_to_remove = (id, )

        # Check if the customer exists in the database
        cursor.execute("SELECT * FROM Customers WHERE id = %s", customer_to_remove)
        customer = cursor.fetchone()
        if not customer:
            return jsonify({"error": "Customer not found"}), 404

        # If customer exists, proceed to delete
        query = "DELETE FROM Customers WHERE id = %s"
        cursor.execute(query, customer_to_remove)
        conn.commit()

        # Successful delete of customer
        return jsonify({"message": "Customer removed successfully"}), 200

    except Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        # Closing the database connection
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

if __name__ == '__main__':
    app.run(debug=True)