from pydantic import BaseModel, ConfigDict, EmailStr, Field


class ContactRequest(BaseModel):
    """Payload sent by the website contact form."""

    model_config = ConfigDict(str_strip_whitespace=True, populate_by_name=True)

    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    company: str | None = Field(default=None, max_length=160)
    service_interest: str | None = Field(default=None, max_length=120, alias="serviceInterest")
    message: str = Field(min_length=10, max_length=5000)

    # Honeypot: real users never fill this; bots often do. Handled in the endpoint.
    website: str | None = Field(default=None, max_length=200)


class ContactResponse(BaseModel):
    ok: bool
    message: str
