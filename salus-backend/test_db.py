from database import SessionLocal
from models.usuario import Usuario


# Crear una sesión de base de datos
db = SessionLocal()

# Consultar todos los usuarios
usuarios = db.query(Usuario).all()

for usuario in usuarios:
    print(f"ID: {usuario.id}, Nombre: {usuario.nombre}, Email: {usuario.email}, Contrasena: {usuario.contrasena}")

db.close()
