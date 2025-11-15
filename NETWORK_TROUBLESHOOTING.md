# Network Connection Troubleshooting

## Error: "Network request failed"

This error occurs when the frontend (Expo) cannot reach the backend API on port 5000. Here's how to fix it:

---

## Solution 1: Running on Web (Easiest)

If you're running Expo on **web** (`press w`), use `127.0.0.1`:

**File:** `my-app/app/upload.tsx` (line 18)
```tsx
const API_BASE_URL = "http://127.0.0.1:5000";
```

**Why?** When Expo runs in your browser, `localhost` resolves to the browser environment, not your machine.

✅ **This should work immediately!**

---

## Solution 2: Running on Mobile or Physical Device

If you're testing on **Android**, **iOS**, or a **physical device**, you need your machine's IP address instead of localhost.

### Step 1: Find Your Machine's IP Address

**Windows (PowerShell):**
```powershell
ipconfig
```
Look for "IPv4 Address" (usually `192.168.x.x` or `10.x.x.x`)

**Example output:**
```
Ethernet adapter Ethernet:
   IPv4 Address . . . . . . . . . . . : 192.168.1.100
```

### Step 2: Update API URL

**File:** `my-app/app/upload.tsx` (line 18)
```tsx
// Change this:
const API_BASE_URL = "http://192.168.1.100:5000"; // Use YOUR IP
```

---

## Solution 3: Verify Backend is Running

```powershell
curl http://127.0.0.1:5000/api/health
```

Expected response:
```json
{"status": "ok", "message": "Backend API is running"}
```

If no response → **Backend is not running!**

Start it:
```powershell
.\start-backend.ps1
```

---

## Solution 4: Check Firewall

Your Windows firewall might be blocking port 5000.

### Allow Python through Firewall:
1. Open **Windows Defender Firewall** → **Advanced Settings**
2. Click **Inbound Rules** → **New Rule**
3. Select **Program** → **Next**
4. Browse to your Python executable (in `venv/Scripts/python.exe`)
5. Select **Allow** → **Next**
6. Check all network types → **Finish**

---

## Solution 5: Test with cURL (Debugging)

To verify the backend is responding:

```powershell
# Test with sample base64 image data
$base64Image = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="

curl -X POST http://127.0.0.1:5000/api/analyze-image-base64 `
  -H "Content-Type: application/json" `
  -d "{`"image`":`"$base64Image`"}"
```

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Network request failed | Backend not running | Run `.\start-backend.ps1` |
| Network request failed | Wrong IP/port | Check API_BASE_URL in upload.tsx |
| Network request failed | Firewall blocking | Allow Python in Windows Firewall |
| CORS error | Backend CORS config | Already configured in app.py |
| Timeout error | API taking too long | Check image size (should be small) |

---

## Quick Checklist

- [ ] Backend running? (`.\start-backend.ps1`)
- [ ] Backend on port 5000? (check `start-backend.ps1`)
- [ ] Using `127.0.0.1` not `localhost`? (for web)
- [ ] Using machine IP for mobile? (e.g., `192.168.x.x`)
- [ ] Firewall allowing Python? (Windows Firewall)
- [ ] Health endpoint responds? (`curl http://127.0.0.1:5000/api/health`)

---

## Still Not Working?

Check the browser console (press `F12` in web):
- Look for the actual network error
- Check if request is being sent to the right URL
- Check response status code (200 = success, 4xx = client error, 5xx = server error)

Or check Flask backend logs in the terminal running `.\start-backend.ps1`
