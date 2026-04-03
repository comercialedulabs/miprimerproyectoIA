# Mi Primer Proyecto IA

Full-stack app with a Python/FastAPI backend and a React/Vite frontend.
Mock Google OAuth login that authenticates against a hardcoded user list.

---

## Project structure

```
mi primer proyecto IA/
├── backend/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       └── pages/
│           ├── Login.jsx
│           └── Hello.jsx
├── .gitignore
└── README.md
```

---

## Running the backend

1. Open a terminal and navigate to the `backend` folder:

```bash
cd "mi primer proyecto IA/backend"
```

2. (Recommended) Create and activate a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate   # macOS/Linux
# or: venv\Scripts\activate  (Windows)
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Start the server:

```bash
uvicorn main:app --reload --port 8000
```

The API will be available at http://localhost:8000

---

## Running the frontend

1. Open a **new** terminal and navigate to the `frontend` folder:

```bash
cd "mi primer proyecto IA/frontend"
```

2. Install dependencies:

```bash
npm install
```

3. Start the dev server:

```bash
npm run dev
```

The app will be available at http://localhost:3000

---

## Mock users

| Token | Email | Name |
|-------|-------|------|
| `mock-token-usuario@gmail.com` | usuario@gmail.com | Usuario Demo |
| `mock-token-admin@gmail.com` | admin@gmail.com | Admin User |

The "Iniciar sesion con Google" button automatically uses `mock-token-usuario@gmail.com`.

---

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/google` | Accepts `{ token }`, returns user data |
| GET | `/api/hello` | Protected. Requires `Authorization: Bearer <email>` |
