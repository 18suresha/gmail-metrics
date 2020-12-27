const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});
const axios = require('axios');
const fs = require('fs');

async function getMetrics() {
    const creds_file = fs.readFileSync('creds.json');
    const creds = JSON.parse(creds_file);

    let METRICS_PARAMS = {
        fngtm: '(NOT from:*@gmail.com) to:asuresh180@gmail.com in:inbox newer_than:1h', 
        fgtm: 'from:*@gmail.com to:asuresh180@gmail.com in:inbox newer_than:1h',
        fmtng: 'from:asuresh180@gmail.com (NOT to:*@gmail.com) in:inbox newer_than:1h',
        fmtg: 'from:asuresh180@gmail.com to:*@gmail.com in:inbox newer_than:1h'
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

async function insertMetrics() {
    const ddb = new AWS.DynamoDB.DocumentClient();
    const tstamp = Math.floor(Date.now() / 1000);
    const results = await getMetrics();
    for (let key in results) {
        let params = {
            TableName: 'gmail_metrics',
            Item: {
                'metric': key,
                'tstamp': tstamp,
                'count': results[key]
            }
        };
        ddb.put(params, function(err, data) {
            if (err) {
                console.log('Error', err)
            } else {
                console.log('Success', data)
                return false;
            }
        });
    }
    return true;
}

exports.handler = async function() {
    // (async() => {
        await insertMetrics();
    // })()
};
