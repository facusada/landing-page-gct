import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.routers import contact

logging.basicConfig(level=logging.INFO)

settings = get_settings()

app = FastAPI(
    title="Global Core Technologies — Landing API",
    version="1.0.0",
    description="Backend para el formulario de contacto del sitio.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(contact.router)


@app.get("/health", tags=["health"])
async def health() -> dict[str, str]:
    return {"status": "ok"}
