from pydantic import BaseModel

class UsuarioBase(BaseModel):
    nombre: str
    email: str

class UsuarioCrear(UsuarioBase):
    contrasena: str

class UsuarioRespuesta(UsuarioBase):
    id: int

    class Config:
        orm_mode = True
