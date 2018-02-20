from flask import Flask, flash, redirect, render_template, request, session, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from application.models import User, OrganizationType, Organization, OrganizationAdmin
from flask_jwt import JWT, jwt_required, current_identity
from application.db_connector import db
from util.hash_password import hash_password, check_password
from datetime import datetime, timedelta
import os

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

#flask_jwt setup
app.config['JWT_AUTH_URL_RULE'] = "/login"
app.config['SECRET_KEY'] = os.urandom(12)
app.config['JWT_EXPIRATION_DELTA'] = timedelta(hours=2)


current_orgs = [{"organizationName": "test", "organizationType": "service"},
                {"organizationName": "test2", "organizationType": "Melinda"}]
@app.route("/")
def home():
   return render_template("index.html")

@app.route("/hello")
def hello():
   return "Hello World!"

def authenticate(username, password):
    user = User.query.filter_by(email=username).first()
    if user and check_password(user.password, password):
        return user

def identity(payload):
    user_id = payload['identity']
    return User.query.get(int(user_id))

jwt = JWT(app, authenticate, identity)

@jwt.jwt_error_handler
def error_handler(e):
    if e.error == "Invalid token":
        return redirect("/")
    return e.description, e.status_code

@app.route('/register',methods=['POST'])
def register():
    request_data = request.get_json()
    data = User(first_name=request_data["first_name"],
                last_name=request_data["last_name"], 
                email=request_data["email"],
                password=hash_password(request_data["password"]),
                major=None)
        
    #email validation
    user = User.query.filter_by(email=data.email).first()
    if user is not None: 
        return jsonify(message="Email already registered"), 400
        
    try:     
        db.session.add(data)
        db.session.commit()        
        db.session.close()
    except:
        db.session.rollback()
    return jsonify(message="successful register")

#for debugging purposes: returns all registers users stored in db
@app.route('/users',methods=['GET'])
def print_all_users():
    try: 
        query_db = User.query.order_by(User.id.desc())
        for q in query_db:
            print(q)
    except:
            db.session.rollback()
    return "success"

#for debugging purposes: requires a JWT in the authorization header to access
@app.route('/protected')
@jwt_required()
def protected():
    return '%s' % current_identity

@app.route('/organizations',methods=['POST'])
@jwt_required()
def create_organization():
    request_data = request.get_json()

    org_type = OrganizationType.query.filter_by(name=request_data["organizationType"]).first()
    data = Organization(name=request_data["organizationName"])
    data.org_type = org_type
        
    try:     
        db.session.add(data)
    except:
        db.session.rollback()

    org = Organization.query.filter_by(name=request_data["organizationName"]).first()
    org_admin = OrganizationAdmin(current_identity.id, org.id) 

    try:     
        db.session.add(org_admin)
        db.session.commit()        
        db.session.close()
    except:
        db.session.rollback()

    return jsonify(message="successful organization creation")

@app.route('/organizations',methods=['GET'])
@jwt_required()
def get_organizations():
    print('beginning')
    #orgs = OrganizationAdmin.query.filter_by(user_id=current_identity.id).all()
    orgs = Organization.query.join(OrganizationAdmin).filter_by(user_id=current_identity.id).all()
    print('\n\n\n')
    print(orgs)
    serialized = [Organization.serialize(item) for item in orgs]
    return jsonify(message=serialized), 200


if __name__ == "__main__":
   app.secret_key = os.urandom(12)
   app.run(port=5000)
