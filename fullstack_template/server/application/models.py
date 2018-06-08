from application.db_connector import db
from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, DateTime, BigInteger
from sqlalchemy.orm import relationship
from datetime import datetime, timedelta

class OrganizationType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), unique=True) 
    organizations = relationship("Organization", backref='org_type')
    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<OrganizationType %r>' % (self.name) 

class Major(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), unique=True)

    def __init__(self, name):
        self.name = name 

    def __repr__(self):
        return '<Major %r>' % (self.name) 

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(128), unique=False)
    last_name = db.Column(db.String(128), unique=False)
    email = db.Column(db.String(128), unique=False)
    password = db.Column(db.String(128), unique=False)
    major = db.Column(db.Integer, ForeignKey(Major.id)) 

    events_created = db.relationship('Event', backref='creator')
    events_rsvped = relationship('EventRSVP', back_populates="user")
    event_comments = relationship('EventComment', back_populates="user")
    
    def __init__(self, first_name, last_name, email, password, major):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.major = major 

    def __repr__(self):
        return '<User %r %r %r %r, %r>' % (self.first_name, self.last_name, self.email, self.password, self.major)

organization_admins = db.Table('organization_admins',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('org_id', db.Integer, db.ForeignKey('organization.id'), primary_key=True)
)

pending_organization_admins = db.Table('pending_organization_admins', 
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('org_id', db.Integer, db.ForeignKey('organization.id'), primary_key=True)
)

organization_members = db.Table('organization_members',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('org_id', db.Integer, db.ForeignKey('organization.id'), primary_key=True)
)


class Organization(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), unique=True) 
    org_type_id = db.Column(db.Integer, ForeignKey(OrganizationType.id))
    description = db.Column(db.String(1024))
    image = db.Column(db.String(1024))
    events = relationship("Event", backref='organization', order_by='desc(Event.event_start)')
    admins = db.relationship('User', secondary=organization_admins,
        backref=db.backref('organizations_as_admin'))
    pending_admins = db.relationship('User', secondary=pending_organization_admins,
        backref=db.backref('organizations_as_pending_admins'))  
    members = db.relationship('User', secondary=organization_members,
        backref=db.backref('organizations_as_member'))

    def __repr__(self):
        return '<Organization %r %r %r>' % (self.name, self.org_type, self.description)
    
    def serialize(self, userId=None):
        requestedAdmin = False
        if userId is not None:
            if any(user.id == userId for user in self.pending_admins):
                requestedAdmin = True

        return {
            'organizationId': self.id,
            'organizationName': self.name, 
            'organizationType': self.org_type.name,
            'organizationDescription': self.description,
            'organizationImage': self.image,
            'requestedAdmin': requestedAdmin,
            'adminRequests': len(self.pending_admins)
        } 

class Event(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), unique=True) 
    org_id = db.Column(db.Integer, ForeignKey('organization.id')) 
    creator_id = db.Column(db.Integer, ForeignKey('user.id'))
    description = db.Column(db.String(1024)) 
    date_created = db.Column(DateTime(timezone=True))
    event_start = db.Column(DateTime(timezone=True)) 
    event_end = db.Column(DateTime(timezone=True)) 
    location = db.Column(db.String(128)) 
    members_only = db.Column(db.Boolean)
    tags = db.Column(db.String(512)) 
    event_items = db.Column(db.String(256), default=None)
    include_year = db.Column(db.Boolean)
    max_participants = db.Column(db.Integer)
    image = db.Column(db.String(1024))
    status = db.Column(db.Integer, default=-1) 
    rsvps = relationship('EventRSVP', back_populates="event")
    comments = relationship('EventComment', back_populates="event")

    def __repr__(self):
        return '<Event %r %r %r %r %r %r %r %r %r %r %r %r>' % (self.org_id, self.creator, self.description, self.date_created, self.event_start, self.event_end, self.location, self.members_only, self.tags, self.event_items, self.include_year, self.status)

    def serialize(self):
        return {
            'eventId': self.id,
            'eventTitle': self.name, 
            'eventDescription': self.description,
            'eventLocation': self.location,
            'eventStartTime': self.event_start.strftime('%m/%d/%y %I:%M%p'),
            'eventEndTime': self.event_end.strftime('%m/%d/%y %I:%M%p'),
            'eventMembersOnly': self.members_only,
            'eventOrganization': self.organization.name,
            'maxParticipants': self.max_participants,
            'eventImage': self.image,
            'eventTags': self.tags
        }

class EventRSVP(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey(User.id)) 
    event_id = db.Column(db.Integer, ForeignKey(Event.id))
    status = db.Column(db.Integer)

    user = relationship("User", back_populates="events_rsvped")
    event = relationship("Event", back_populates="rsvps")

    def __repr__(self):
        return '<EventRSVP %r %r %r>' % (self.user_id, self.event_id, self.status)

class EventComment(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey(User.id)) 
    event_id = db.Column(db.Integer, ForeignKey(Event.id))
    content = db.Column(db.String(1024))
    #epoch time in ms
    date_posted = db.Column(db.BigInteger)

    user = relationship("User", back_populates="event_comments")
    event = relationship("Event", back_populates="comments")

    def __repr__(self):
        return '<EventComment %r %r %r %r>' % (self.user_id, self.event_id, self.content, self.date_posted) 
    
    def serialize(self):
        return {
            'eventId': self.event_id,
            'user': self.user.first_name + " " + self.user.last_name,
            'content': self.content,
            'datePosted': self.date_posted
        }
