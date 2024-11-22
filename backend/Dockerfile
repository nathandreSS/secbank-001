FROM python:3.10-slim

# Install Poetry
RUN apt-get update && apt-get install -y curl \
    && curl -sSL https://install.python-poetry.org | python3 - \
    && export PATH="/root/.local/bin:$PATH"

WORKDIR /app

COPY pyproject.toml poetry.lock ./

RUN /root/.local/bin/poetry install --no-root

COPY . .

CMD ["sh", "-c", "/root/.local/bin/poetry run alembic upgrade heads && /root/.local/bin/poetry run uvicorn src.main:app --host 0.0.0.0 --port 8000"]

