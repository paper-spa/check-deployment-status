FROM curlimages/curl:latest
COPY . /app
ENTRYPOINT ["/app/entrypoint.sh"]