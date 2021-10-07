#!/bin/sh

while true; do 
    echo $INPUT_STATUS_URL
    i=1
    RESP=$(curl --header "Authorization: Bearer $INPUT_TOKEN" $INPUT_STATUS_URL)
    STATUS=$(jq -n "$RESP" | jq .status)
    if [[ "$STATUS" == "succeed" ]]; then
        echo "Build finished, with status!"
        break
    else
        echo "Current status is $STATUS"
    fi
    if [[ (($i == 10)) ]]; then
        echo "Build failed!"
        exit 1
    fi
    i=$((i+1))
    sleep 10
done 
