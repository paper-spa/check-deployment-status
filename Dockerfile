FROM curlimages/curl:latest
COPY . /app

#needed to parse response
RUN apk add --no-cache  jq

ENTRYPOINT ["/app/entrypoint.sh"]