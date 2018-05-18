from flask import Flask, flash, redirect, render_template, request, session, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from application.models import User, OrganizationType, Organization, Event, EventRSVP, EventComment
from flask_jwt import JWT, jwt_required, current_identity
from flask_cors import CORS, cross_origin

from time import time, gmtime, strftime, localtime
from application.db_connector import db
from util.hash_password import hash_password, check_password
from util.converters import get_rsvp_status_string
from datetime import datetime, timedelta
import os

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "supports_credentials": True}})
app.config['CORS_HEADERS'] = 'Content-Type'

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

@app.route('/orgs/create',methods=['POST'])
@jwt_required()
def create_organization():
    request_data = request.get_json()

    org_type = OrganizationType.query.filter_by(name=request_data["organizationType"]).first()
    org = Organization(name=request_data["organizationName"], 
                        description=request_data["organizationDescription"],
                        image=request_data["organizationImage"])
    org.org_type = org_type
    org.admins = [current_identity]
    org.members.append(current_identity)
    
    try:     
        db.session.add(org)
        db.session.commit()
    except:
        db.session.rollback()

    return jsonify(message="successful organization creation")

@app.route('/orgs/all',methods=['GET'])
def get_all_orgs():
    serialized = []
    try: 
        orgs = Organization.query.all()
        serialized = [Organization.serialize(item) for item in orgs]
    except:
        db.session.rollback()
    return jsonify(message=serialized), 200 

#adds or removes the current user as a member of the specified organization
#orgs?join=true&org_id=1
#orgs?join=false&org_id=1
@app.route('/orgs',methods=['POST'])
@jwt_required()
def join_organization():
    message = ""
    join = request.args.get("join")
    org_id = int(request.args.get("org_id"))

    org = Organization.query.get(org_id)
    if join == "true":
        org.members.append(current_identity)
        message = "successful organization joining"
    else:
        org.members.remove(current_identity)
        message = "successful organization leaving"

    try:     
        db.session.add(org)
        db.session.commit()
    except:
        db.session.rollback()
    return jsonify(message=message)

#returns the orgs you are a member of or an admin of
@app.route('/orgs/admin=<sel>',methods=['GET'])
@jwt_required()
def get_organizations(sel):
    serialized = []

    if sel == 'true':
        #get all organizations you are an admin of
        orgs = current_identity.organizations_as_admin
    else :
        #get all organizations you are a member of
        orgs = current_identity.organizations_as_member

    serialized = [Organization.serialize(item) for item in orgs]
    return jsonify(message=serialized), 200

@app.route('/events/create',methods=['POST'])
@jwt_required()
def create_event():
    request_data = request.get_json()

    eventTags = ''.join(request_data["eventTags"].split()) + "#"
    dateFormat = '%Y-%m-%dT%H:%M:%S'

    eventStart = datetime.strptime(request_data["eventStartTime"][:-5], dateFormat) - timedelta(hours=7)
    eventEnd = datetime.strptime(request_data["eventEndTime"][:-5], dateFormat) - timedelta(hours=7)

    data = Event(name=request_data["eventTitle"], 
                 description=request_data["eventDescription"],
                 location=request_data["eventLocation"],
                 event_start=eventStart,
                 event_end=eventEnd,
                 members_only=request_data["eventMembersOnly"],
                 max_participants=request_data["maxParticipants"], 
                 image=request_data["eventImage"],
                 tags=eventTags)

    org_name = request_data["callOutTitle"]
    data.organization = Organization.query.filter_by(name=org_name).first()
    data.creator = current_identity
    
    try:     
        db.session.add(data)
        db.session.commit()
    except:
        db.session.rollback()

    return jsonify(message="successful event creation")

@app.route('/events/all',methods=['GET'])
def get_all_events():
    serialized = []
    try: 
        events = Event.query.all()
        serialized = [Event.serialize(item) for item in events]
    except:
        db.session.rollback()
    return jsonify(message=serialized), 200 

#returns all the events that you have not rsvp to that has the <tag> in the event title or tags list
#path ex: /events?filter=<tag>
@app.route('/events',methods=['GET'])
@jwt_required()
def get_events_filtered():
    serialized = []
    tag = request.args.get("filter")

    #default when there is no filter, returns all the events you have not rsvp to 
    if tag == "":
        return get_events_rsvp("false")

    try: 
        subquery = EventRSVP.query.with_entities(EventRSVP.event_id).filter_by(user_id=current_identity.id)
        events = db.session.query(Event).filter(~Event.id.in_(subquery)) \
                                        .filter((Event.tags.like("%#" + tag + "#%")) | (Event.name.like("%" + tag + "%"))).all()
        serialized = [Event.serialize(item) for item in events]
    except:
        db.session.rollback()

    return jsonify(message=serialized), 200 

#returns the events you are a member of or an admin of
@app.route('/events/admin=<sel>',methods=['GET'])
@jwt_required()
def get_events(sel):
    serialized = []

    if sel == 'true':
        #gets all the events for the orgs you are an admin of
        orgs = current_identity.organizations_as_admin
    else :
        #gets all the events for the orgs you are a member of
        orgs = current_identity.organizations_as_member

    serialized = [{"title" : item.name,
                       "admin" : True,
                       "events" : 
                          [Event.serialize(i) for i in item.events]
                       } for item in orgs]

    return jsonify(message=serialized), 200
    
#set the rsvp status for an event
@app.route('/events/rsvp',methods=['POST', 'PUT'])
@jwt_required()
def set_RSVP():
    if request.method == 'POST':
        request_data = request.get_json()
        event = Event.query.get(request_data["eventId"])

        rsvp = EventRSVP(status = request_data["status"])
        rsvp.event = event
        rsvp.user = current_identity
    else:
        request_data = request.get_json()
        rsvp = EventRSVP.query.filter_by(
            user_id=current_identity.id,
            event_id=request_data["eventId"]).first()
        rsvp.status = request_data["status"]

    try:     
        db.session.add(rsvp)
        db.session.commit()
    except:
        db.session.rollback()

    return jsonify(message="set rsvp successful")

#returns the events you've RSVPed to 
@app.route('/events/rsvp=<sel>',methods=['GET'])
@jwt_required()
def get_events_rsvp(sel):
    serialized = []
    if sel == 'false':
        #returns all the events that the current user has not RSVP to 
        subquery = EventRSVP.query.with_entities(EventRSVP.event_id).filter_by(user_id=current_identity.id)
        events = db.session.query(Event).filter(~Event.id.in_(subquery)).all()
        
        serialized = [Event.serialize(e) for e in events]
    else:
        #returns all the events that the current user has RSVPed to, grouped by organization   
        events_and_status = db.session.query(Event, Event.org_id, EventRSVP.status).outerjoin(EventRSVP) \
                                                .filter(EventRSVP.user_id.is_(current_identity.id)) \
                                                .order_by(Event.event_start.desc()).all()

        orgs = db.session.query(Organization).outerjoin(Event).outerjoin(EventRSVP) \
                                                .filter(EventRSVP.user_id.is_(current_identity.id)).all()
        
        serialized = [{"title" : item.name,
                        "events": 
                            [(Event.serialize(event), get_rsvp_status_string(rsvp_status)) for (event, org_id, rsvp_status) in events_and_status if org_id is item.id]
                        } for item in orgs]

    return jsonify(message=serialized), 200

#adds a comment to the specified event
@app.route('/event/<id>/comments',methods=['POST'])
@jwt_required()
def add_comment(id):
    if request.method == 'POST':
        request_data = request.get_json()
        event = Event.query.get(id)
        #converting epoch time to ms
        date_posted = round(time() * 1000)
        
        comment = EventComment(content = request_data["content"],
                               date_posted = date_posted)
        comment.event = event
        comment.user = current_identity

    try:     
        db.session.add(comment)
        db.session.commit()
    except:
        db.session.rollback()

    return jsonify(message="add comment successful")

#returns a list of comments posted for the specified event
@app.route('/event/<id>/comments',methods=['GET'])
@jwt_required()
def get_event_comments(id):
    serialized = []
    event = Event.query.get(id)
    serialized = [EventComment.serialize(item) for item in event.comments]

    return jsonify(message=serialized), 200

@app.route('/org/<id>/events',methods=['GET'])
@jwt_required()
def get_org_events(id):
    serialized = []
    org_name = Organization.query.get(id).name

    #events rsvp with status
    events_and_status = db.session.query(Event, EventRSVP.status).filter_by(org_id=id).outerjoin(EventRSVP) \
                                                .filter(EventRSVP.user_id.is_(current_identity.id)) \
                                                .order_by(Event.event_start.desc()).all()

    #events not rsvped to
    events_rsvp = EventRSVP.query.with_entities(EventRSVP.event_id).filter_by(user_id=current_identity.id).subquery()
    events_not_rsvp = db.session.query(Event).filter(~Event.id.in_(events_rsvp)).filter_by(org_id=id)\
                                             .order_by(Event.event_start.desc()).all()

    events_serialized = [(Event.serialize(event), get_rsvp_status_string(rsvp_status)) for (event, rsvp_status) in events_and_status]
    [events_serialized.append((Event.serialize(event), "")) for event in events_not_rsvp]
    
    serialized = [{"title" : org_name,
                   "events": events_serialized
                  }]

    return jsonify(message=serialized), 200

@app.route('/event/<id>/statistics',methods=['GET'])
@jwt_required()
def get_event_statistics(id):
    
    going = db.session.query(EventRSVP, User)\
                    .filter_by(event_id=id).filter_by(status=2)\
                    .join(User).with_entities(User.first_name, User.last_name).all()

    interested = db.session.query(EventRSVP, User.first_name, User.last_name)\
                    .filter_by(event_id=id).filter_by(status=1)\
                    .join(User).with_entities(User.first_name, User.last_name).all()

    not_going = db.session.query(EventRSVP, User.first_name, User.last_name)\
                    .filter_by(event_id=id).filter_by(status=0)\
                    .join(User).with_entities(User.first_name, User.last_name).all()

    going = [user[0] + " " + user[1] for user in going]
    interested = [user[0] + " " + user[1] for user in interested]
    not_going = [user[0] + " " + user[1] for user in not_going]

    serialized = {
        "going":going,
        "interested":interested,
        "not_going":not_going
    }
    
    return jsonify(message=serialized)
    
    
    

if __name__ == "__main__":
   app.secret_key = os.urandom(12)
   app.run(port=5000, threaded=True)