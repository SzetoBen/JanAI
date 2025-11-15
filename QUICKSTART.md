# Quick Start - TL;DR

## Prerequisites
- Python 3.8+
- Node.js 16+
- Google Generative AI API key (from https://ai.google.dev/)

## 5-Minute Setup

### 1. Set API Key
Edit `.env` (or move to `backend/.env.local`):
```env
GOOGLE_API_KEY=your_key_here
```

### 2. Install & Run Everything
Open **PowerShell** in project root:

```powershell
# One-time setup
.\setup-dev.ps1
```

### 3. Start Services (2 terminals needed)

**Terminal 1:**
```powershell
.\start-backend.ps1
# Wait for: "Running on http://0.0.0.0:5000"
```

**Terminal 2:**
```powershell
.\start-frontend.ps1
# Press 'w' for web
```

## ✅ Done!

Open http://localhost:8081 (or the URL shown) to use the app.

---

## Testing Flow

1. Click upload photo
2. Select image from device
3. Click "Analyze & Create Task"
4. Watch the backend analyze with Google AI
5. See results on tasks screen

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `Port 5000 already in use` | Change port in `backend/app.py` |
| `Module not found` | Run `pip install -r requirements.txt` |
| Frontend can't reach backend | Backend not running on port 5000 |
| Script won't run | `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` |

---

## API URLs

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `http://localhost:5000/api/health` | GET | Check if backend is running |
| `http://localhost:5000/api/analyze-image-base64` | POST | Send image for analysis |
| `http://localhost:5000/api/analyze-image` | POST | Upload image file directly |

---

## Key Files

- **Backend Logic**: `backend/process_image.py`
- **Backend API**: `backend/app.py` ← NEW
- **Frontend Logic**: `my-app/app/upload.tsx` ← UPDATED
- **API Config**: `my-app/config/api.config.ts` ← NEW
- **Startup Scripts**: `start-backend.ps1`, `start-frontend.ps1` ← NEW

---

For detailed info, see: `DEVELOPMENT.md` or `SETUP.md`
