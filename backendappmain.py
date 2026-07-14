from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from .core.config import settings
from .api.v1.endpoints import auth, servers, users, logs

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security Headers
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["*"]  # در production محدود کنید
)

# روت‌ها
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(servers.router, prefix="/api/v1/servers", tags=["servers"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(logs.router, prefix="/api/v1/logs", tags=["logs"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to AZ VPN API",
        "version": settings.VERSION,
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}