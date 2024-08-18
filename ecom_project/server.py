import mysql.connector
from mysql.connector import Error
from flask import Flask, jsonify, request
from flask_marshmallow import Marshmallow
from marshmallow import fields, ValidationError
from flask_cors import CORS
from werkzeug.security import generate_password_hash


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
    user_name = fields.String()
    password = fields.String()

    class Meta:
        fields = ("id", "customer_name", "email", "phone", "user_name", "password")

customer_schema = CustomerSchema()
customers_schema = CustomerSchema(many=True)

class OrderSchema(ma.Schema):
    id = fields.Integer(required= False)
    order_date = fields.Date(required= False)
    customer_id = fields.Integer(required= True)

    class Meta:
        fields = ('id', 'order_date', 'customer_id', 'items')

order_schema = OrderSchema()
orders_schema = OrderSchema(many= True)

class ProductSchema(ma.Schema):
    id = fields.Integer(required= False)
    product_name = fields.String(required= True)
    price = fields.Float(required= True)

    class Meta:
        fields = ('id', 'product_name', 'price')

product_schema = ProductSchema()
products_schema = ProductSchema(many= True)

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
        query = "SELECT * FROM Customer"

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
        cursor.execute("SELECT * FROM Customer WHERE id = %s", customer_to_get)

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
        new_customer = (customer_data['customer_name'], customer_data['email'], customer_data['phone'], customer_data['user_name'], generate_password_hash(customer_data['password']))

        # SQL query to add new customer
        query = "INSERT INTO Customer (customer_name, email, phone, user_name, password) VALUES (%s, %s, %s, %s, %s)"

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
        updated_customer = (customer_data['customer_name'], customer_data['email'], customer_data['phone'], id)

        # SQL query to update the customer's details
        query = "UPDATE Customer SET customer_name = %s, email = %s, phone = %s WHERE id = %s"

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
        cursor.execute("SELECT * FROM Customer WHERE id = %s", customer_to_remove)
        customer = cursor.fetchone()
        if not customer:
            return jsonify({"error": "Customer not found"}), 404

        # If customer exists, proceed to delete
        query = "DELETE FROM Customer WHERE id = %s"
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

#============ Product Interactions ===================#

# route to create/add new products with a POST request

@app.route('/products', methods=['POST'])
def add_product():
    try:
        # Validate and deserialize using Marshmallow input data sent by the client
        product_data = product_schema.load(request.json)
    except ValidationError as e:
        print(f"Error: {e}")
        return jsonify(e.messages), 400

    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor()

        # New product details
        new_product = (product_data['product_name'], product_data['price'])

        # SQL query to add new product
        query = "INSERT INTO Products (product_name, price) VALUES (%s, %s)"

        # Executing the query
        cursor.execute(query, new_product)
        conn.commit()

        # Successful addition of the new product
        return jsonify({"message": "New product added successfully"}), 201

    except Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

# route to get all products with a GET request

@app.route('/products', methods=['GET'])
def get_products():
    try:
        # Establishing connection to the database
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor(dictionary=True)

        # SQL query to fetch all products
        query = "SELECT * FROM Products"

        # Executing the query
        cursor.execute(query)

        # Fetching the results and preparing for JSON response
        products = cursor.fetchall()

        # Use Marshmallow to format the JSON response
        return products_schema.jsonify(products)

    except Error as e:
        # Handling any errors that occur during the process
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        # Closing the database connection
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

# route to get a single product with a GET request

@app.route('/products/<int:id>', methods=['GET'])

def get_product(id):
    try:
        # Establishing connection to the database
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor(dictionary=True)

        # SQL query to fetch all products
        product_to_get = (id, )

        # Check if the product exists in the database
        cursor.execute("SELECT * FROM Products WHERE id = %s", product_to_get)

        # Fetching the results and preparing for JSON response
        product = cursor.fetchall()

        # Use Marshmallow to format the JSON response
        return products_schema.jsonify(product)

    except Error as e:
        # Handling any errors that occur during the process
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        # Closing the database connection
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

# route to update a product with a PUT request

@app.route('/products/<int:id>', methods=['PUT'])

def update_product(id):
    try:
        # Validate and deserialize using Marshmallow input data sent by the client
        product_data = product_schema.load(request.json)
    except ValidationError as e:
        print(f"Error: {e}")
        return jsonify(e.messages), 400

    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor()

        # Updated product details
        updated_product = (product_data['product_name'], product_data['price'], id)

        # SQL query to update the product's details
        query = "UPDATE Products SET product_name = %s, price = %s WHERE id = %s"

        # Executing the query
        cursor.execute(query, updated_product)
        conn.commit()

        # Successful update of the new product
        return jsonify({"message": "Product details updated successfully"}), 200

    except Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        # Closing the database connection
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

# route to delete a product with a DELETE request

@app.route('/products/<int:id>', methods=['DELETE'])

def delete_product(id):
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor()
        product_to_remove = (id, )

        # Check if the product exists in the database
        cursor.execute("SELECT * FROM Products WHERE id = %s", product_to_remove)
        product = cursor.fetchone()
        if not product:
            return jsonify({"error": "Product not found"}), 404

        # If product exists, proceed to delete
        query = "DELETE FROM Products WHERE id = %s"
        cursor.execute(query, product_to_remove)
        conn.commit()

        # Successful delete of product
        return jsonify({"message": "Product removed successfully"}), 200

    except Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        # Closing the database connection
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

#================ Order Interactions ====================#

# route to create/add new orders with a POST request

@app.route('/orders', methods=['POST'])
def add_order():
    try:
        # Validate and deserialize using Marshmallow input data sent by the client
        order_data = order_schema.load(request.json)
    except ValidationError as e:
        print(f"Error: {e}")
        return jsonify(e.messages), 400

    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor()

        # New order details
        new_order = (order_data['order_date'], order_data['customer_id'])

        # SQL query to add new order
        query = "INSERT INTO Orders (order_date, customer_id) VALUES (%s, %s)"

        # Executing the query
        cursor.execute(query, new_order)
        conn.commit()

        # Successful addition of the new order
        return jsonify({"message": "New order added successfully"}), 201

    except Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

# route to get one order with a GET request

@app.route('/orders/<int:id>', methods=['GET'])

def get_order(id):
    try:
        # Establishing connection to the database
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor(dictionary=True)

        # SQL query to fetch all orders
        order_to_get = (id, )

        # Check if the order exists in the database
        cursor.execute("SELECT * FROM Orders WHERE id = %s", order_to_get)

        # Fetching the results and preparing for JSON response
        order = cursor.fetchall()

        # Use Marshmallow to format the JSON response
        return orders_schema.jsonify(order)

    except Error as e:
        # Handling any errors that occur during the process
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        # Closing the database connection
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

# route to get items in an order by order id with a GET request

@app.route('/orders/<int:id>/items', methods=['GET'])

def get_order_items(id):
    try:
        # Establishing connection to the database
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor(dictionary=True)

        # SQL query to fetch all items in an order
        order_items = (id, )
        query = "SELECT * FROM OrderItems WHERE order_id = %s"

        # Executing the query
        cursor.execute(query, order_items)

        # Fetching the results and preparing for JSON response
        items = cursor.fetchall()

        # Use Marshmallow to format the JSON response
        return jsonify(items)

    except Error as e:
        # Handling any errors that occur during the process
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        # Closing the database connection
        if conn and conn.is_connected():
            cursor.close()
            conn.close()


if __name__ == '__main__':
    app.run(debug=True)