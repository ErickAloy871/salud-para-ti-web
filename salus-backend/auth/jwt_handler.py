from jose import jwt
import os
from datetime import datetime, timedelta

SECRET_KEY = os.getenv("SECRET_KEY", "clave_por_defecto")

def crear_token(data: dict, expiracion: int = 60):
    expiracion_tiempo = datetime.utcnow() + timedelta(minutes=expiracion)
    data.update({"exp": expiracion_tiempo})
    token = jwt.encode(data, SECRET_KEY, algorithm="HS256")
    return token

def verificar_token(token: str):
    try:
        data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return data
    except jwt.ExpiredSignatureError:
        return None
