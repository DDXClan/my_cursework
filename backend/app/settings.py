from dotenv import load_dotenv
import os
from fastapi.security import OAuth2PasswordBearer
load_dotenv()

DATABASE_URL = os.environ['DATABASE_URL']
SECRET_KEY = os.environ['SECRET_KEY']
ALGORITHM = os.environ['ALGORITHM']
img_folder = './img'
oauth2scheme = OAuth2PasswordBearer('/api/auth/login')