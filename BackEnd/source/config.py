from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "YouTube Downloader API"
    app_version: str = "0.1.0"

    database_url: str = "sqlite:///./database.db"

    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    frontend_url: str = "http://localhost:5173"

    model_config = SettingsConfigDict(env_file=".env",env_file_encoding="utf-8",case_sensitive=False)


settings = Settings()