const {google} = require('googleapis');
const fs = require('fs');

function getMetrics(callback) {
    const creds_file = fs.readFileSync('creds.json');
    const creds = JSON.parse(creds_file);
    const oAuth2Client = new google.auth.OAuth2(creds['client_id'], creds['client_secret']);
    oAuth2Client.setCredentials({refresh_token: creds['refresh_token']});

    const gmail = google.gmail({version: 'v1', auth: oAuth2Client});

    var results = {
        fmtg: 0,
        fmtng: 0,
        fgtm: 0,
        fngtm: 0
    };
    
    gmail.users.messages.list({
        userId: 'me',
        q: 'from:asuresh180@gmail.com to:*@gmail.com in:sent newer_than:1d'
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        results['fmtg'] = res.data.resultSizeEstimate;
        gmail.users.messages.list({
        userId: 'me',
        q: 'from:asuresh180@gmail.com (NOT to:* @gmail.com) in:sent newer_than:1d'
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            results['fmtng'] = res.data.resultSizeEstimate;
            gmail.users.messages.list({
                userId: 'me',
                q: 'from:*@gmail.com to:asuresh180@gmail.com in:inbox newer_than:1d'
            }, (err, res) => {
                if (err) return console.log('The API returned an error: ' + err);
                results['fgtm'] = res.data.resultSizeEstimate;
                gmail.users.messages.list({
                    userId: 'me',
                    q: '(NOT from:*@gmail.com) to:asuresh180@gmail.com in:inbox newer_than:1d'
                }, (err, res) => {
                    if (err) return console.log('The API returned an error: ' + err);
                    results['fngtm'] = res.data.resultSizeEstimate;
                    callback(results);
                });
            });
        });
    });
}

function setMetrics(results) {
    console.log(results);
}

getMetrics(setMetrics);

