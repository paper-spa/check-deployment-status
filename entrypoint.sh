#!/bin/sh

while true; do 
    echo $INPUT_STATUS_URL
    RESP=$(curl --header "Authorization: Bearer $INPUT_TOKEN" $INPUT_STATUS_URL)
    if [ "$RESP" == "1" ]; then
        echo "1"
        break
    fi
    echo "test: "
    echo $RESP
    echo $INPUT_TOKEN
    echo $INPUT_STATUS_URL
    sleep 1 
    break 
done 
