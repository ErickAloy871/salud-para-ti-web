from fastapi import FastAPI
from auth.router import auth_router

app = FastAPI()

app.include_router(auth_router)

@app.get("/")
def inicio():
    return {"mensaje": "API de Salus Backend funcionando"}
