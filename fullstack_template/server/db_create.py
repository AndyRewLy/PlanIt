from application.db_connector import db
from application.models import User

db.create_all()

print("DB created.")
