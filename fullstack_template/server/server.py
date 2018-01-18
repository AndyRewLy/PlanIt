from flask import Flask, flash, redirect, render_template, request, session, abort
import os

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

@app.route("/")
def home():
   return render_template("index.html")

@app.route("/hello")
def hello():
   return "Hello World!"

if __name__ == "__main__":
   app.secret_key = os.urandom(12)
   app.run()
