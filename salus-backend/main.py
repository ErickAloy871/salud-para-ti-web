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
    allow_origins=["*"],  # Permite solicitudes desde cualquier origen
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
    correo: str
    password: str

@app.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.correo == data.correo).first()
    if not usuario or usuario.password != data.password:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    if not usuario.activo:
        raise HTTPException(status_code=403, detail="Usuario inactivo")
    return {
        "mensaje": "Login exitoso",
        "usuario": {
            "id_usuario": usuario.id_usuario,
            "correo": usuario.correo,
            "username": usuario.username,
            "nombre": usuario.nombre,
            "apellido": usuario.apellido,
            "tipo": usuario.tipo,
            "activo": usuario.activo,
            "cedula": usuario.cedula,
            "telefono": usuario.telefono
        }
    }

@app.options("/login")
def options_login():
    return Response(status_code=204)
