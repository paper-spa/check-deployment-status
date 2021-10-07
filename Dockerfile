FROM curlimages/curl:latest
COPY . /app

#needed to parse response
RUN apk add jq

ENTRYPOINT ["/app/entrypoint.sh"]