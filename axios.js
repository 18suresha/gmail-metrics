const axios = require('axios')
const fs = require('fs');

const creds_file = fs.readFileSync('creds.json');
const creds = JSON.parse(creds_file);

axios
  .post('https://oauth2.googleapis.com/token?client_id=' + creds['client_id'] + '&client_secret=' + creds['client_secret'] + '&refresh_token=' + creds['refresh_token'] + '&grant_type=refresh_token')
  .then(res => {
    console.log(`access token: ${res.data.access_token}`)
    axios.get('https://gmail.googleapis.com/gmail/v1/users/asuresh180@gmail.com/messages', {
        params: {
            q: '(NOT from:*@gmail.com) to:asuresh180@gmail.com in:inbox newer_than:1d'
        },
        headers: {
            Authorization: 'Bearer ' + res.data.access_token,
            Accept: 'application/json'
        }
    }).then(res => {
        console.log(res.status)
    }).catch(error => {
        console.log(error)
    })
  })
  .catch(error => {
    console.error(error)
  })