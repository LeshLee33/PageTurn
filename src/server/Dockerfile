FROM python:3.11


WORKDIR /code


COPY ./requirements.txt /code/server/requirements.txt


RUN pip install --no-cache-dir --upgrade -r /code/server/requirements.txt


COPY . /code/server


CMD ["uvicorn", "server.main:app", "--host", "0.0.0.0", "--port", "8000"]