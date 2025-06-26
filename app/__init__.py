from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS
from flask_jwt_extended import JWTManager

# Inicializa a aplicação
app = Flask(__name__)
app.config.from_object('config')
CORS(
    app,
    resources={r"/api/*": {"origins": "http://localhost:5173"}},
    methods=["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    supports_credentials=True
)

# Inicializa o banco de dados
db = SQLAlchemy(app)
migrate = Migrate(app, db)
app.config['JWT_TOKEN_LOCATION'] = ['headers']      

jwt = JWTManager(app)


lm = LoginManager(app)
from app.models.tables import User  

#é uma função que vai fazer o carregamento dos usuários
@lm.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

from app.models import tables, forms
from app.controllers import default

