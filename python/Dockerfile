FROM python:3.8-buster

RUN apt-get update \
    && apt-get install -y --no-install-recommends libxmlsec1-dev libzbar0\
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY server.py ./
COPY config.py ./
COPY api ./api

CMD [ "gunicorn", "server:app", "--config", "config.py"]
