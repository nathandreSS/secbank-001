from pydantic import BaseModel
from pydantic_settings import BaseSettings


class PostgreSQLSettings(BaseModel):
    host: str
    port: int
    database: str
    user: str
    password: str

    def get_async_url(self):
        return f"postgresql+asyncpg://{self.user}:{self.password}@{self.host}:{self.port}/{self.database}"

    def get_sync_url(self):
        return f"postgresql+psycopg2://{self.user}:{self.password}@{self.host}:{self.port}/{self.database}"


class JWTSettings(BaseModel):
    secret_key: str
    algorithm: str
    access_token_minutes_exp: int
    refresh_token_minutes_exp: int


class Settings(BaseSettings):
    postgresql: PostgreSQLSettings
    jwt: JWTSettings


settings = Settings(_env_file="src/infrastructure/settings/.env")
