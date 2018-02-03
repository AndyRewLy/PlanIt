from application.db_connector import db
from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, DateTime

class OrganizationType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), index=True, unique=True) 

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<OrganizationType %r>' % (self.name) 

class Major(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), index=True, unique=True)

    def __init__(self, name):
        self.name = name 

    def __repr__(self):
        return '<Major %r>' % (self.name) 

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(128), index=True, unique=False)
    last_name = db.Column(db.String(128), index=True, unique=False)
    email = db.Column(db.String(128), index=True, unique=False)
    password = db.Column(db.String(128), index=True, unique=False)
    major = db.Column(db.Integer, ForeignKey(Major.id)) 
    
    def __init__(self, first_name, last_name, email, password, major):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.major = major 

    def __repr__(self):
        return '<User %r %r %r %r>' % (self.first_name, self.last_name, self.email, self.password, self.major)

class Organization(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), index=True, unique=True) 
    org_type = db.Column(db.Integer, ForeignKey(OrganizationType.id))

    def __init__(self, name, org_type): 
        self.name = name
        self.org_type = org_type 

    def __repr__(self):
        return '<Organization %r %r>' % (self.name, self.org_type)

class OrganizationAdmin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey(User.id))
    org_id = db.Column(db.Integer, ForeignKey(Organization.id)) 

    def __init__(self, user_id, org_id): 
        self.user_id = user_id
        self.org_id = org_id

    def __repr__(self):
        return '<Organization admin %r %r>' % (self.user_id, self.org_id) 

class OrganizationMember(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey(User.id))
    org_id = db.Column(db.Integer, ForeignKey(Organization.id)) 

    def __init__(self, user_id, org_id): 
        self.user_id = user_id
        self.org_id = org_id

    def __repr__(self):
        return '<Organization admin %r %r>' % (self.user_id, self.org_id)     

class Event(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    org_id = db.Column(db.Integer, ForeignKey(Organization.id)) 
    creator = db.Column(db.Integer, ForeignKey(OrganizationAdmin.id)) 
    description = db.Column(db.String(1024), index=True) 
    date_created = db.Column(DateTime(timezone=True))
    event_date = db.Column(DateTime(timezone=True)) 
    location = db.Column(db.String(128), index=True) 
    members_only = db.Column(db.Boolean)
    tags = db.Column(db.String(512), index=True) 
    event_items = db.Column(db.String(256), index=True, default=None)
    include_year = db.Column(db.Boolean)
    status = db.Column(db.Integer, default=-1) 

    def __init__(self, org_id, creator, description, date_created, event_date, location, members_only, tags, event_items, include_year, status):
        self.org_id = org_id
        self.creator = creator
        self.description = description
        self.date_created = date_created
        self.event_date = event_date
        self.location = location
        self.members_only = members_only
        self.tags = tags
        self.event_items = event_items
        self.include_year = include_year
        self.status = status

    def __repr__(self):
        return '<Event %r %r %r %r %r %r %r %r %r %r %r>' % (self.org_id, self.creator, self.description, self.date_created, self.event_date, self.location, self.members_only, self.tags, self.event_items, self.include_year, self.status)

class EventRSVP(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey(User.id)) 
    event_id = db.Column(db.Integer, ForeignKey(Event.id))
    status = db.Column(db.Integer, index=True)

    def __init__(self, user_id, event_id, status):
        self.user_id = user_id
        self.event_id = event_id
        self.status = status

    def __repr__(self):
        return '<EventRSVP %r %r %r>' % (self.user_id, self.event_id, self.status)

class EventComment(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey(User.id)) 
    event_id = db.Column(db.Integer, ForeignKey(Event.id))
    comment = db.Column(db.String(1024), index=True)
    date = db.Column(DateTime(timezone=True))

    def __init__(self, user_id, event_id, comment, date):
        self.user_id = user_id
        self.event_id = event_id
        self.comment = comment
        self.date = date 

    def __repr__(self):
        return '<EventComment %r %r %r %r>' % (self.user_id, self.event_id, self.comment, self.date) 

class AdminComment(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey(OrganizationAdmin.id)) 
    event_id = db.Column(db.Integer, ForeignKey(Event.id))
    comment = db.Column(db.String(1024), index=True)
    date = db.Column(DateTime(timezone=True))

    def __init__(self, user_id, event_id, comment, date):
        self.user_id = user_id
        self.event_id = event_id
        self.comment = comment
        self.date = date 

    def __repr__(self):
        return '<AdminComment %r %r %r %r>' % (self.user_id, self.event_id, self.comment, self.date) 
