from flask import Flask, flash, redirect, render_template, request, session, abort
from flask_sqlalchemy import SQLAlchemy
from application.models import User
from application import db
import os

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

@app.route("/")
def home():
   return render_template("index.html")

@app.route("/hello")
def hello():
   return "Hello World!"

@app.route('/register',methods=['POST'])
def register():
    if request.method == 'POST':
        request_data = request.get_json()
        data = User(first_name=request_data["first_name"],
                    last_name=request_data["last_name"], 
                    email=request_data["email"],
                    password=request_data["password"])
        try:     
            db.session.add(data)
            db.session.commit()        
            db.session.close()
        except:
            db.session.rollback()
        return "success"
    else:
        return "fail"

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

if __name__ == "__main__":
   app.secret_key = os.urandom(12)
   app.run()
