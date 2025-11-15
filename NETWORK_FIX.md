# Network Error - Diagnostic Report

## Issue: "TypeError: Network request failed"

### Root Cause Found ✅
Your machine IP address was **incorrect** in the configuration!

---

## Fix Applied ✅

**Updated:** `my-app/config/environment.ts`

```typescript
export const MACHINE_IP = "172.25.124.156"; // ← UPDATED from 172.25.117.203
```

**Why this happened:**
- IP addresses can change when you reconnect to Wi-Fi
- Each device (phone, computer) gets a dynamic IP
- The old IP (172.25.117.203) was stale

---

## What to Do Now

### 1. Force App Reload

**In Expo terminal (where `npm start` is running):**
```
Press: r
```

This will reload the Expo app on your phone. The new IP will be loaded.

### 2. Try Uploading Again

1. Go back to home screen
2. Click "Upload Mess Photo"
3. Select an image
4. Click "Analyze & Create Task"
5. It should work now! ✅

---

## Important: IP Addresses Change!

Whenever you:
- ↻ Restart your computer
- ↻ Reconnect to Wi-Fi
- ↻ After 24 hours (typically)
- ↻ Restart your router

**Your IP might change again!**

### To Get Your Current IP:
```powershell
ipconfig
```

Look for: **IPv4 Address** (usually starts with 192.168 or 172.x)

### To Update When IP Changes:
1. Edit: `my-app/config/environment.ts` (line 14)
2. Update: `export const MACHINE_IP = "YOUR_NEW_IP";`
3. Reload: Press `r` in Expo terminal

---

## Verify It's Working

### From Your Phone Browser:
```
http://172.25.124.156:5000/api/health
```

Should show:
```json
{
  "status": "ok",
  "message": "Backend API is running"
}
```

If this works → Your phone can reach the backend ✅

---

## Quick Checklist

- [x] Backend running on port 5000
- [x] Correct IP updated in config
- [ ] Reload Expo (press `r`)
- [ ] Try uploading image again
- [ ] Monitor backend console for errors

---

## If Still Not Working

1. **Check IP again:**
   ```powershell
   ipconfig
   # Copy the IPv4 Address
   ```

2. **Update config:**
   Edit `my-app/config/environment.ts` line 14

3. **Reload:**
   Press `r` in Expo terminal

4. **Test in browser:**
   Open phone browser → `http://YOUR_IP:5000/api/health`

5. **Check backend logs:**
   Look for errors in the `.\start-backend.ps1` terminal

---

## Pro Tip: Use Static IP (For Development)

If your IP keeps changing, you can set a static IP on your router:
1. Access router admin panel
2. Find DHCP settings
3. Reserve IP for your computer
4. Your IP won't change anymore!

---

## Summary

✅ IP updated: `172.25.124.156`
✅ Reload Expo: Press `r`
✅ Try again
✅ Should work!

**Key Lesson:** IP addresses are dynamic. If network error returns, run `ipconfig` and update the IP again!
