from application.db_connector import db
from application.models import OrganizationType, Organization

db.session.add(OrganizationType('Academic'))
db.session.add(OrganizationType('Community Service'))
db.session.add(OrganizationType('Council'))
db.session.add(OrganizationType('Cultural'))
db.session.add(OrganizationType('Environmental'))
db.session.add(OrganizationType('Honor'))
db.session.add(OrganizationType('National Society'))
db.session.add(OrganizationType('Performing Arts'))
db.session.add(OrganizationType('Political'))
db.session.add(OrganizationType('Professional'))
db.session.add(OrganizationType('Recreational'))
db.session.add(OrganizationType('Religious'))
db.session.add(OrganizationType('Special Interest'))


db.session.add(data)
db.session.commit()