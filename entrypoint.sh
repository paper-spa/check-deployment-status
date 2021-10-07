#!/bin/sh

while true; do 
    echo $INPUT_STATUS_URL
    RESP=$(curl -I $INPUT_STATUS_URL)
    if [ "$RESP" == "1" ]; then
        echo "1"
        break
    fi
    echo "test: "
    echo $RESP
    sleep 1 
    break 
done 
