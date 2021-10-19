require("regenerator-runtime/runtime");
const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');
const { rawListeners } = require("process");

async function check() {
    try {
        const api_token = core.getInput('token');
        const url = core.getInput('status_url');
        const timeout = core.getInput('timeout');
        const timeout_duration = core.getInput('timeout_duration');
        const error_count_max = core.getInput('error_count');
        var tries = 0;
        var error_count = 0;
        while (tries < timeout) {
            tries++;
            await new Promise(r => setTimeout(r, timeout_duration));
            var res = await axios.get(url, {
                headers: {
                    'Authorization': `token ${api_token}`
                }
            });

            if (res.data.status == "succeed") {

                console.log("Reported success!");
                core.setOutput("status", "succeed");
                break;
            } else {
                console.log("Current status: " + res.data.status);
            }

            if (res.status != 200) {
                error_count++;
            }

            if (error_count >= error_count_max) {
                console.log("Too many errors, aborting!");
                core.setFailed("Failed with status code: " + res.status)
                break;
            }
        }
        if (tries >= timeout) {
            console.log("Timeout reached, aborting!");
            core.setFailed("Timeout reached, aborting!")
        }
    } catch (error) {
        core.setFailed(error.message);
        // throw new Error(error);
    }
}

function main() {
    check().then(() => {
        console.log('done');
    });

}

module.exports = {
    check,
    main
}