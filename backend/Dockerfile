FROM python:latest
ENV PYTHONUNBUFFERED 1

RUN mkdir /app
WORKDIR /app
COPY requirements.txt /app/
RUN pip install -r requirements.txt
COPY . .
RUN chmod +x /app/docker-entrypoint.sh
ENTRYPOINT ["sh","/app/docker-entrypoint.sh"]