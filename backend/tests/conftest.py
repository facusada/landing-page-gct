import os

# The test suite must never reach Microsoft Graph and must not depend on a local
# .env with real credentials. Environment variables take precedence over .env in
# pydantic-settings, so this forces the log backend for anything that imports app.main.
os.environ.setdefault("MAIL_BACKEND", "log")
