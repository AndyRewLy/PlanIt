from application import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(128), index=True, unique=False)
    last_name = db.Column(db.String(128), index=True, unique=False)
    email = db.Column(db.String(128), index=True, unique=False)
    password = db.Column(db.String(128), index=True, unique=False)
    
    def __init__(self, first_name, last_name, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password

    def __repr__(self):
        return '<Data %r>' % self.email