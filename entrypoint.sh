#!/bin/bash
i=1
while true; do 
    RESP=$(curl --header "Authorization: Bearer $INPUT_TOKEN" $INPUT_STATUS_URL)
    STATUS=$(jq -n "$RESP" | jq .status | xargs)
    if [ "$STATUS" = "succeed" ]; then
        echo "Deployment finished, with status $STATUS!"
        exit 0
    else
        echo "Current status is $STATUS"
    fi
    if [ $i -eq $INPUT_TIMEOUT ]; then
        echo "Deployment failed!"
        exit 1
    fi
    i=$((i+1))
    sleep 1
done 
