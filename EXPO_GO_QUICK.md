# Expo Go - Quick Reference

## 3-Step Setup for Your Phone

### 1️⃣ Find Your Machine IP
```powershell
ipconfig
```
Look for: **IPv4 Address** (e.g., `192.168.1.100`)

### 2️⃣ Update Configuration
Edit: `my-app/config/environment.ts` (line 9)

Change:
```ts
export const MACHINE_IP = "192.168.1.100"; // Your IP from ipconfig
```

Change ACTIVE_ENV to:
```ts
export const ACTIVE_ENV = "MOBILE"; // or "WEB" for browser
```

### 3️⃣ Start Everything & Scan QR Code

**Terminal 1:**
```powershell
.\start-backend.ps1
```

**Terminal 2:**
```powershell
cd my-app
npm start
```

**On Phone:**
1. Open Expo Go app
2. Scan QR code shown in terminal
3. Wait for app to load
4. Test with your phone's camera! 📱

---

## Switching Modes

| Mode | File | Setting | Use When |
|------|------|---------|----------|
| **Web** | `environment.ts` | `ACTIVE_ENV = "WEB"` | Testing in browser (`npm start` → press `w`) |
| **Phone** | `environment.ts` | `ACTIVE_ENV = "MOBILE"` | Testing on Expo Go |
| **Production** | `environment.ts` | `ACTIVE_ENV = "PRODUCTION"` | Deployed app |

---

## Troubleshooting

**Phone can't find dev server?**
- Check: Same Wi-Fi network?
- Check: Correct IP in `environment.ts`?
- Restart: All terminals

**Backend not responding?**
- Check: `.\start-backend.ps1` running?
- Check: `http://YOUR_IP:5000/api/health` works?

**Hot reload not working?**
- Save file again
- Or press `r` in terminal to reload

---

## Pro Tips

✅ Use **real phone** for best testing (camera works great)
✅ **Same Wi-Fi network** is essential
✅ **Hot reload** works - changes appear instantly
✅ **Hot reload bug?** Press `r` in terminal to force reload
✅ Test on **multiple devices** for consistency

---

See `EXPO_GO_SETUP.md` for detailed guide
