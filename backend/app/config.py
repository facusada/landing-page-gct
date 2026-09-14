from functools import lru_cache
from typing import Literal

from pydantic import SecretStr, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings, loaded from environment / .env file."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # App
    app_env: str = "development"

    # Mail backend: "graph" sends via Microsoft Graph, "log" only logs (dev/tests).
    mail_backend: Literal["graph", "log"] = "graph"

    # Microsoft Graph — OAuth 2.0 client credentials (Entra ID app registration)
    graph_tenant_id: str = ""
    graph_client_id: str = ""
    graph_client_secret: SecretStr = SecretStr("")
    # Read/write timeout for token + sendMail requests (connect timeout is fixed at 5s).
    graph_timeout_seconds: float = 20.0

    # Email addressing
    # mail_from must be the UPN of a real Exchange Online mailbox (shared mailbox is fine);
    # it is the {mailbox} in POST /users/{mailbox}/sendMail.
    mail_from: str = "no-reply@gctechs.com"
    mail_from_name: str = "Global Core Technologies"
    mail_to: str = "info@gctechs.com"

    # CORS: comma-separated list of allowed origins
    allowed_origins: str = "http://localhost:3000"

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]

    @model_validator(mode="after")
    def _require_graph_credentials(self) -> "Settings":
        if self.mail_backend != "graph":
            return self
        required = {
            "GRAPH_TENANT_ID": self.graph_tenant_id,
            "GRAPH_CLIENT_ID": self.graph_client_id,
            "GRAPH_CLIENT_SECRET": self.graph_client_secret.get_secret_value(),
        }
        missing = [name for name, value in required.items() if not value]
        if missing:
            raise ValueError(
                "MAIL_BACKEND=graph requiere las variables: " + ", ".join(missing)
                + ". Para desarrollo sin credenciales usá MAIL_BACKEND=log."
            )
        return self


@lru_cache
def get_settings() -> Settings:
    return Settings()
