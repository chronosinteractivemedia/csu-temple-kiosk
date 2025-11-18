taskkill /F /IM CSUTGKIOSK.exe
timeout /t 30
cmd /k npm run safesync
