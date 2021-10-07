#!/bin/sh

while true; do 
    echo $INPUT_STATUS_URL
    RESP=$(curl --header "Authorization: Bearer $INPUT_TOKEN" $INPUT_STATUS_URL)
    echo $( jq .status "$RESP")
    # if [ .jq .status "$RESP" == '{ "status": "deployment_queued" }' ]; then
    #     echo "this works!"
    #     break
    # fi
    sleep 1 
    break
done 
