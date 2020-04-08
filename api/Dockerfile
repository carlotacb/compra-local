FROM python:3.7

WORKDIR /app

COPY requirements.lock .
COPY uwsgi.ini .

RUN pip install --upgrade pip
RUN pip3 install -r requirements.lock

CMD uwsgi --ini uwsgi.ini