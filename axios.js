const axios = require('axios')
const fs = require('fs');

async function getMetrics() {
    const creds_file = fs.readFileSync('creds.json');
    const creds = JSON.parse(creds_file);

    let METRICS_PARAMS = {
        fngtm: '(NOT from:*@gmail.com) to:asuresh180@gmail.com in:inbox newer_than:1d', 
        fgtm: 'from:*@gmail.com to:asuresh180@gmail.com in:inbox newer_than:1d',
        fmtng: 'from:asuresh180@gmail.com (NOT to:*@gmail.com) in:inbox newer_than:1d',
        fmtg: 'from:asuresh180@gmail.com to:*@gmail.com in:inbox newer_than:1d'
    }

    var results = {
        fmtg: 0,
        fmtng: 0,
        fgtm: 0,
        fngtm: 0
    };

    try {
    await axios
    .post('https://oauth2.googleapis.com/token?client_id=' + creds['client_id'] + '&client_secret=' + creds['client_secret'] + '&refresh_token=' + creds['refresh_token'] + '&grant_type=refresh_token')
    .then(async function(res) {
        for (let key in METRICS_PARAMS) {
            await axios.get('https://gmail.googleapis.com/gmail/v1/users/asuresh180@gmail.com/messages', {
            params: {
                q: METRICS_PARAMS[key]
            },
            headers: {
                Authorization: 'Bearer ' + res.data.access_token,
                Accept: 'application/json'
            }
            }).then(res => {
                results[key] = res.data.resultSizeEstimate;
            }).catch(error => {
                console.log(error)
            })
        }
    })
    .catch(error => {
        console.error(error)
    })
    } catch(err) {
        console.log(err);
    }
    return results;
}

(async() => {
    console.log(await getMetrics());
})()
