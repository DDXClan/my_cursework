FROM python:3.14.3

WORKDIR /backend

COPY requirements.txt /backend/requirements.txt
COPY alembic.ini /backend/alembic.ini

RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

COPY app /backend/app

COPY ./alembic.ini /backend/alembic.ini

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]