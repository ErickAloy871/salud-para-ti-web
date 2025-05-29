from fastapi import FastAPI, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from auth.router import auth_router
from database import SessionLocal
from models.usuario import Usuario
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Permitir solicitudes desde el frontend (ajusta el origen si es necesario)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://localhost:8080", "http://192.168.1.29:8080/"],  # Agrega aquí el puerto de tu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

@app.get("/")
def inicio():
    return {"mensaje": "API de Salus Backend funcionando"}

# Dependencia para obtener la sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.email == data.username).first()
    if not usuario or usuario.contrasena != data.password:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    return {
        "mensaje": "Login exitoso",
        "usuario": {
            "id": usuario.id,
            "nombre": usuario.nombre,
            "email": usuario.email
        }
    }

@app.options("/login")
def options_login():
    return Response(status_code=204)
