FROM ubuntu:latest
COPY . /app
RUN apt-get update && apt-get install -y curl

ENTRYPOINT ["/app/entrypoint.sh"]