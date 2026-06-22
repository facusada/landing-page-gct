from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings, loaded from environment / .env file."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # App
    app_env: str = "development"

    # SMTP connection
    smtp_host: str = "localhost"
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    # STARTTLS (port 587). Set smtp_use_ssl=True for implicit TLS (port 465).
    smtp_use_tls: bool = True
    smtp_use_ssl: bool = False

    # Email addressing
    mail_from: str = "no-reply@gctechs.com"
    mail_from_name: str = "Global Core Technologies"
    mail_to: str = "info@gctechs.com"

    # CORS: comma-separated list of allowed origins
    allowed_origins: str = "http://localhost:3000"

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
