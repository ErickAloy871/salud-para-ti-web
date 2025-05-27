from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models.usuario import Usuario
from schemas.usuario import UsuarioCrear, UsuarioRespuesta

auth_router = APIRouter(prefix="/auth", tags=["auth"])

# Crear tablas
Usuario.metadata.create_all(bind=engine)

# Dependencia para obtener la DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@auth_router.post("/registro", response_model=UsuarioRespuesta)
def registro(usuario: UsuarioCrear, db: Session = Depends(get_db)):
    usuario_existente = db.query(Usuario).filter(Usuario.email == usuario.email).first()
    if usuario_existente:
        raise HTTPException(status_code=400, detail="Email ya registrado")
    
    nuevo_usuario = Usuario(
        nombre=usuario.nombre,
        email=usuario.email,
        contrasena=usuario.contrasena  # En producción, encriptar
    )
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario
