
# edit the URI below to add your RDS password and your AWS URL
# The other elements are the same as used in the tutorial
# format: (user):(password)@(db_identifier).amazonaws.com:3306/(db_name)


# Uncomment the line below if you want to work with a local DB
SQLALCHEMY_DATABASE_URI = 'sqlite:///testdb'
SQLALCHEMY_TRACK_MODIFICATIONS=False
SQLALCHEMY_POOL_RECYCLE = 3600

WTF_CSRF_ENABLED = True
