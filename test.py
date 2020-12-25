import json
import requests


TOKEN_URL = 'https://oauth2.googleapis.com/token'
TOKEN_PARAMS = {'client_id': '578090944255-olljifkg0c8ii8c8l9b9hln7qck46a3j.apps.googleusercontent.com', 
'client_secret': 'z8LbhPW3JTeJEFIGQGg2m7oI', 
'refresh_token': json.load(open('creds.json'))['refresh_token'],
'grant_type': 'refresh_token'}

METRICS_URL = 'https://gmail.googleapis.com/gmail/v1/users/asuresh180@gmail.com/messages'
METRICS_PARAMS = {
    'fngtm': '(NOT from:*@gmail.com) to:asuresh180@gmail.com in:inbox newer_than:1d', 
    'fgtm': 'from:*@gmail.com to:asuresh180@gmail.com in:inbox newer_than:1d',
    'fmtng': 'from:asuresh180@gmail.com (NOT to:*@gmail.com) in:inbox newer_than:1d',
    'fmtg': 'from:asuresh180@gmail.com to:*@gmail.com in:inbox newer_than:1d'
    }

def getMetrics():
    results = {
        'fmtg': 0,
        'fmtng': 0,
        'fgtm': 0,
        'fngtm': 0
    }
    token_response = requests.post(url=TOKEN_URL, params=TOKEN_PARAMS)

    access_token = token_response.json()['access_token']

    for key in METRICS_PARAMS:
        metrics_response = requests.get(url=METRICS_URL, params={'q': METRICS_PARAMS[key]}, headers={'Authorization': 'Bearer ' + access_token, 'Accept': 'application/json'})
        results[key] = metrics_response.json()['resultSizeEstimate']
    
    return results

print(getMetrics())
