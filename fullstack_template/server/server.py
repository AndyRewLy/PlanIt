from flask import Flask, flash, redirect, render_template, request, session, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from application.models import User, OrganizationType, Organization, Event, EventRSVP
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

@app.route('/orgs',methods=['POST'])
@jwt_required()
def create_organization():
    request_data = request.get_json()

    org_type = OrganizationType.query.filter_by(name=request_data["organizationType"]).first()
    data = Organization(name=request_data["organizationName"], 
                        description=request_data["organizationDescription"])
    data.org_type = org_type
    data.admins = [current_identity]
    
    try:     
        db.session.add(data)
        db.session.commit()
    except:
        db.session.rollback()

    return jsonify(message="successful organization creation")

#returns the orgs you are a member of or an admin of
@app.route('/orgs/admin=<sel>',methods=['GET'])
@jwt_required()
def get_organizations(sel):
    serialized = ""
    print(current_identity.organization_admins)
    if sel == 'true':
        orgs = current_identity.organization_admins
        serialized = [Organization.serialize(item) for item in orgs]
    else :
        print("Get all organizations you are a member of")
    return jsonify(message=serialized), 200

@app.route('/events',methods=['POST'])
@jwt_required()
def create_event():
    request_data = request.get_json()
    data = Event(name=request_data["eventTitleValue"], 
                 description=request_data["eventDescriptionValue"],
                 location=request_data["eventLocationValue"],
                 members_only=request_data["eventMembersOnlyValue"])
    
    org_name = request_data["callOutTitle"]
    data.organization = Organization.query.filter_by(name=org_name).first()
    data.creator = current_identity
    
    try:     
        db.session.add(data)
        db.session.commit()
    except:
        db.session.rollback()

    return jsonify(message="successful event creation")

#returns the events you are a member of or an admin of
@app.route('/events/admin=<sel>',methods=['GET'])
@jwt_required()
def get_events(sel):
    serialized = ""
    if sel == 'true':
        orgs = current_identity.organization_admins
        serialized = [{"title" : item.name,
                       "admin" : True,
                       "events" : 
                          [Event.serialize(i) for i in item.events]
                       } for item in orgs]
    else :
        print("Get all events for the orgs you are a member of")
  

    return jsonify(message=serialized), 200
    
#set the rsvp status for an event
@app.route('/events/rsvp',methods=['POST'])
@jwt_required()
def set_RSVP():
    request_data = request.get_json()
    event = Event.query.get(request_data["eventId"])

    rsvp = EventRSVP(status = request_data["status"])
    rsvp.event = event
    rsvp.user = current_identity
        
    try:     
        db.session.add(rsvp)
        db.session.commit()
    except:
        db.session.rollback()

    return jsonify(message="set rsvp successful")

#returns all the events that the current user has not RSVP to
@app.route('/events/rsvp=<sel>',methods=['GET'])
@jwt_required()
def get_events_rsvp(sel):
    serialized = ""
    if sel == 'true':
        subquery = EventRSVP.query.with_entities(EventRSVP.event_id).filter_by(user_id=current_identity.id)
        events = db.session.query(Event).filter(~Event.id.in_(subquery)).all()
        
        serialized = [Event.serialize(e) for e in events]
    else :
        print("Get all events you have rsvp for")
  
    return jsonify(message=serialized), 200


if __name__ == "__main__":
   app.secret_key = os.urandom(12)
   app.run(port=5000)
