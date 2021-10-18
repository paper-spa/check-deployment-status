const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

async function check() {
    try {
        const api_token = core.getInput('token');
        const url = core.getInput('status_url');
        const timeout = core.getInput('timeout');
        var tries = 0;
        var error_count = 0;
        while (tries < timeout) {
            tries++;
            await new Promise(r => setTimeout(r, 1000));
            var res = await axios.get(url, {
                headers: {
                    'Authorization': `token ${api_token}`
                }
            });

            if (res.data.status == "succeed") {
                console.log("Reported success!");
                break;
            } else {
                console.log("Current status: " + res.data.status);
            }

            if (res.status != 200) {
                error_count++;
            }

            if (error_count > 10) {
                console.log("Too many errors, aborting!");
                core.setFailed("Failed with status code: " + res.status)
                break;
            }
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

check().then(() => {
    console.log('done');
});