import json
import requests

refresh_token = json.load(open('creds.json'))['refresh_token']

TOKEN_URL = 'https://oauth2.googleapis.com/token'
TOKEN_PARAMS = {'client_id': '578090944255-olljifkg0c8ii8c8l9b9hln7qck46a3j.apps.googleusercontent.com', 
'client_secret': 'z8LbhPW3JTeJEFIGQGg2m7oI', 
'refresh_token': refresh_token, 
'grant_type': 'refresh_token'}

METRICS_URL = 'https://gmail.googleapis.com/gmail/v1/users/asuresh180@gmail.com/messages'
METRICS_PARAMS = {'q': '(NOT from:*@gmail.com) to:asuresh180@gmail.com in:inbox newer_than:1d'}

token_response = requests.post(url=TOKEN_URL, params=TOKEN_PARAMS)

access_token = token_response.json()['access_token']

print(access_token)

metrics_response = requests.get(url=METRICS_URL, params=METRICS_PARAMS, headers={'Authorization': 'Bearer ' + access_token, 'Accept': 'application/json'})

print(metrics_response.json())
