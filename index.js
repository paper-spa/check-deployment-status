const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

async function check() {
    try {
        const api_token = core.getInput('token');
        const url = core.getInput('status_url');
        const timeout = core.getInput('timeout');
        var tries = 0;
        while (tries < timeout) {
            tries++;
            await new Promise(r => setTimeout(r, 1000));
            var res = await axios.get(url, {
                headers: {
                    'Authorization': `token ${api_token}`
                }
            });

            if (res.status == 200) {
                console.log(res.data.status);
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