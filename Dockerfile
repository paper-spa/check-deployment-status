FROM curlimages/curl:latest
COPY . /app
USER root
#needed to parse response
RUN apk add --no-cache  jq

ENTRYPOINT ["/app/entrypoint.sh"]