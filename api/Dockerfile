FROM python:3.7

WORKDIR /

COPY . .

RUN pip install --upgrade pip
RUN pip3 install -r requirements.lock

CMD uwsgi --ini uwsgi.ini
