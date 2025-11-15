# Running on Expo Go (Physical Phone)

## What is Expo Go?

Expo Go is a mobile app that lets you run your React Native app on your phone during development. No building needed!

---

## Setup Steps

### Step 1: Install Expo Go on Your Phone

**iOS:**
- Open App Store
- Search "Expo Go"
- Install (by Expo)

**Android:**
- Open Google Play Store
- Search "Expo Go"
- Install (by Expo)

---

### Step 2: Get Your Machine's IP Address

Your phone needs to connect to your development machine's IP (not localhost).

**Windows (PowerShell):**
```powershell
ipconfig
```

Look for **"IPv4 Address"** - typically looks like `192.168.x.x` or `10.x.x.x`

**Example:**
```
Ethernet adapter:
   IPv4 Address . . . . . . . : 192.168.1.100
   
(Use: 192.168.1.100)
```

---

### Step 3: Update Backend URL for Mobile

**File:** `my-app/app/upload.tsx` (line ~18)

Change from:
```tsx
const API_BASE_URL = "http://127.0.0.1:5000";
```

To your machine's IP:
```tsx
const API_BASE_URL = "http://192.168.1.100:5000"; // Use YOUR IP from ipconfig
```

**Important:** Make sure:
- Backend is running: `.\start-backend.ps1`
- Backend listens on `0.0.0.0:5000` (it does by default)

---

### Step 4: Configure Frontend for Phone

**File:** `my-app/app.json`

Add your machine's IP to the dev client configuration (or just use the default):

```json
{
  "expo": {
    "plugins": [],
    "scheme": "recallify"
  }
}
```

---

### Step 5: Start Expo Dev Server

In your project root:

```powershell
cd my-app
npm start
```

You should see output like:

```
▶ Web               http://localhost:8081
▶ Local             exp://192.168.1.100:19000
▶ Tunnel            exp://[QR-CODE]
```

---

### Step 6: Connect Phone to Network

**CRITICAL:** Your phone MUST be on the same Wi-Fi network as your computer!

1. Open phone Wi-Fi settings
2. Connect to the same network your computer is on
3. Verify connection (Settings → About → IP Address)

---

### Step 7: Scan QR Code

In the Expo dev server terminal, you'll see a QR code.

**iOS:**
- Open Camera app
- Point at QR code
- Tap notification to open in Expo Go

**Android:**
- Open Expo Go app
- Tap "Scan QR Code"
- Point at the QR code in terminal

---

### Step 8: App Loads on Phone!

Your app should now be running on your physical phone! 🎉

---

## Troubleshooting

### "Can't reach dev server"

**Problem:** Phone can't find your machine

**Solutions:**
1. **Check Network:**
   - Both phone and computer on same Wi-Fi? (essential!)
   - Run `ipconfig` again - verify IP is correct
   
2. **Update API URL:**
   - Did you update `upload.tsx` with your IP?
   ```tsx
   const API_BASE_URL = "http://192.168.1.100:5000";
   ```

3. **Check Firewall:**
   - Windows might be blocking port 19000
   - Allow Node.js/npm through firewall

4. **Restart:**
   ```powershell
   # Stop frontend
   # Stop backend
   .\start-backend.ps1    # Terminal 1
   npm start              # Terminal 2 (in my-app)
   ```

### "Backend connection failed"

**Problem:** Phone can reach dev server but not backend API

**Solutions:**
1. Backend running? `.\start-backend.ps1`
2. Using correct IP in `upload.tsx`?
3. Both on same network?
4. Backend listening on all interfaces? (default: `0.0.0.0:5000`)

### "localhost doesn't work"

**This is normal!** Localhost on phone = phone itself, not your computer.
Always use machine IP: `192.168.1.100:5000`

### "Slow performance"

- This is normal over Wi-Fi during development
- Use LAN cable if possible (computer → router)
- Disable VPN if active
- Close other apps using network

---

## Network Modes

### 1. **Local (Recommended for home/office)**
```
Computer → Router ← Phone
(Same Wi-Fi network)
```

- Fastest
- Most reliable
- Requires same network

### 2. **Tunnel (Can connect from anywhere)**
```
Computer → Expo Servers ← Phone
(Through internet)
```

- Slower
- Works outside network
- Auto-uses if Local fails

**To force Tunnel mode:**
```powershell
npx expo start --tunnel
```

---

## Final Checklist

- [ ] Expo Go installed on phone
- [ ] Computer IP found (`ipconfig`)
- [ ] Phone on same Wi-Fi as computer
- [ ] Backend running: `.\start-backend.ps1`
- [ ] `upload.tsx` updated with machine IP
- [ ] Frontend running: `npm start` (in my-app)
- [ ] QR code scanned in Expo Go

---

## Quick Command Reference

```powershell
# Terminal 1: Start backend
.\start-backend.ps1

# Terminal 2: Start frontend
cd my-app
npm start

# Then: Scan QR code with Expo Go on phone
```

---

## Still Having Issues?

1. Check backend health:
   ```powershell
   curl http://YOUR_IP:5000/api/health
   ```
   Should return: `{"status": "ok"}`

2. Check phone can reach machine:
   - Phone Safari: `http://192.168.1.100:8081`
   Should show Expo loading screen

3. Check both are on same network:
   ```powershell
   # On computer
   ipconfig
   
   # On phone: Settings → Wi-Fi → (your network)
   # Should show similar IP range
   ```

---

## Once It's Working

✅ Use phone to test the app
✅ Hot reload works - save file and app updates
✅ Use phone camera for real image testing
✅ Test on actual device (not simulator)

**This is the best way to develop React Native apps!** 📱
