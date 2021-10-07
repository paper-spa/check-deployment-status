FROM curlimages/curl:latest
COPY . /app
USER root
#needed to parse response
RUN apk add --no-cache  jq bash

ENTRYPOINT ["/app/entrypoint.sh"]