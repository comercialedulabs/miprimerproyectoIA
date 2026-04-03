from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock user database
MOCK_USERS = {
    "mock-token-usuario@gmail.com": {
        "email": "usuario@gmail.com",
        "name": "Usuario Demo",
        "picture": "https://ui-avatars.com/api/?name=Usuario+Demo&background=4285F4&color=fff&size=128",
    },
    "mock-token-admin@gmail.com": {
        "email": "admin@gmail.com",
        "name": "Admin User",
        "picture": "https://ui-avatars.com/api/?name=Admin+User&background=34A853&color=fff&size=128",
    },
}

# Email -> user mapping for the protected route
EMAIL_TO_USER = {v["email"]: v for v in MOCK_USERS.values()}


class GoogleAuthRequest(BaseModel):
    token: str


@app.post("/api/auth/google")
def google_auth(body: GoogleAuthRequest):
    user = MOCK_USERS.get(body.token)
    if not user:
        return {"success": False, "user": None}
    return {"success": True, "user": user}


@app.get("/api/hello")
def hello(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")

    email = authorization[len("Bearer "):]
    user = EMAIL_TO_USER.get(email)

    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return {"message": f"Hola Mundo, {user['name']}!"}
