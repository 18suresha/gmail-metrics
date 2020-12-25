const {google} = require('googleapis');
const fs = require('fs');

const creds_file = fs.readFileSync('creds.json');
const creds = JSON.parse(creds_file);
const oAuth2Client = new google.auth.OAuth2(creds['client_id'], creds['client_secret']);
oAuth2Client.setCredentials({refresh_token: creds['refresh_token']});

const gmail = google.gmail({version: 'v1', auth: oAuth2Client});
  gmail.users.messages.list({
    userId: 'me',
    q: '(NOT from:*@gmail.com) to:asuresh180@gmail.com in:inbox newer_than:1d'
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const messages = res.data.messages;
    if (messages.length) {
      console.log('Messages:');
      messages.forEach((message) => {
        console.log(`- ${message.id}`);
      });
    } else {
      console.log('No messages found.');
    }
  });