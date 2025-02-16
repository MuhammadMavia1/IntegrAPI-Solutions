from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure SQLite Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contacts.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the Contact Model
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

# Initialize Database
with app.app_context():
    db.create_all()

@app.route('/submit', methods=['POST'])
def submit_form():
    try:
        data = request.json
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        if not name or not email or not message:
            return jsonify({"status": "error", "message": "All fields are required"}), 400

        # Save to database
        new_contact = Contact(name=name, email=email, message=message)
        db.session.add(new_contact)
        db.session.commit()

        return jsonify({"status": "success", "message": "Thank you for contacting us!"}), 200
    except Exception as e:
        print(e)
        return jsonify({"status": "error", "message": "An error occurred. Please try again."}), 500

@app.route('/contacts', methods=['GET'])
def get_contacts():
    try:
        contacts = Contact.query.all()
        results = [
            {
                "id": contact.id,
                "name": contact.name,
                "email": contact.email,
                "message": contact.message,
                "created_at": contact.created_at,
            }
            for contact in contacts
        ]
        return jsonify({"status": "success", "data": results}), 200
    except Exception as e:
        print(e)
        return jsonify({"status": "error", "message": "Could not retrieve contacts."}), 500


if __name__ == '__main__':
    app.run(debug=True)
