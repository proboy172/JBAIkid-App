import requests
import json

url = "https://api.cobalt.tools/api/json"
headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}
data = {
    "url": "https://www.youtube.com/watch?v=yCjJyiqpAuU",
    "vQuality": "720"
}

print("Requesting Cobalt...")
try:
    response = requests.post(url, headers=headers, json=data)
    print("Status:", response.status_code)
    print("Response:", response.text)
except Exception as e:
    print("Error:", e)
