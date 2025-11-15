# 🚀 Complete Setup Instructions

## What Has Been Done

### ✅ Backend (Flask API)
1. **Created `backend/app.py`** - Flask application with two image analysis endpoints:
   - `POST /api/analyze-image` - MultiPart file upload
   - `POST /api/analyze-image-base64` - Base64 encoded image (used by frontend)
   - `GET /api/health` - Health check

2. **Updated `requirements.txt`** - Added Flask & Flask-CORS

3. **Modified `backend/process_image.py`** - Updated to load `.env.local` from backend directory

### ✅ Frontend (Expo/React Native)
1. **Updated `my-app/app/upload.tsx`** with:
   - Image picker integration ✓
   - Base64 image conversion ✓
   - Backend API calls ✓
   - Loading states & error handling ✓
   - Real AI responses instead of placeholders ✓

### ✅ Development Tools
1. **Created 3 startup scripts**:
   - `setup-dev.ps1` - One-time environment setup
   - `start-backend.ps1` - Launch Flask API
   - `start-frontend.ps1` - Launch Expo frontend

2. **Created `DEVELOPMENT.md`** - Complete development guide

---

## 🎯 How to Run (Choose Your Path)

### Path 1: Quickest (Automated Setup)

**First time only:**
```powershell
.\setup-dev.ps1
```

Then in separate terminals:
```powershell
# Terminal 1
.\start-backend.ps1

# Terminal 2
.\start-frontend.ps1
```

---

### Path 2: Manual Control

#### Backend Setup (Terminal 1)
```powershell
# Create virtual environment (first time)
python -m venv venv

# Activate venv
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Start Flask API
cd backend
python app.py
```

Expected output:
```
 * Running on http://0.0.0.0:5000
```

#### Frontend Setup (Terminal 2)
```powershell
cd my-app

# Install dependencies (first time)
npm install

# Start Expo
npm start
```

Then press:
- `w` for Web
- `i` for iOS
- `a` for Android

---

## 🔗 Data Flow

```
📱 Expo Frontend
   ↓
   User picks image from gallery
   ↓
   Convert to base64
   ↓
   POST /api/analyze-image-base64
   ↓
🖥️ Flask Backend (Port 5000)
   ↓
   Save to temp file
   ↓
   Google Generative AI Analysis
   ↓
   Return JSON:
   {
     "severity": 3,
     "title": "Overflowing trash bin",
     "summary": "..."
   }
   ↓
   Store in task list
   ↓
   Show on tasks screen
```

---

## ✅ Testing Endpoints

### Test Backend is Running
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Backend API is running"
}
```

### Test Image Analysis (with cURL)
```bash
# Test with base64 image
curl -X POST http://localhost:5000/api/analyze-image-base64 \
  -H "Content-Type: application/json" \
  -d @- <<EOF
{
  "image": "base64_image_string_here"
}
EOF
```

---

## 📁 Directory Structure After Setup

```
recallify/
├── venv/                      # Python virtual environment (created)
├── backend/
│   ├── app.py                # NEW - Flask API
│   ├── process_image.py      # Updated
│   ├── .env.local            # Your Google API key
│   ├── .env.example
│   └── model_output.json
├── my-app/
│   ├── node_modules/         # Created after npm install
│   ├── app/
│   │   ├── upload.tsx        # UPDATED - Now calls API
│   │   ├── tasks.tsx
│   │   └── ...
│   └── ...
├── requirements.txt          # Updated with Flask
├── package.json             # NEW - Root workspace
├── start-backend.ps1        # NEW
├── start-frontend.ps1       # NEW
├── setup-dev.ps1            # NEW
├── DEVELOPMENT.md           # NEW - Full guide
└── .gitignore              # Updated
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 5000 in use | Kill process or change port in `backend/app.py` line 56 |
| `ModuleNotFoundError: flask` | Run `pip install -r requirements.txt` |
| Frontend can't reach backend | Ensure backend is running on port 5000 |
| CORS errors | Already handled with `flask-cors` |
| Script execution disabled | Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` |

---

## 📝 Key Files Modified/Created

| File | Status | Purpose |
|------|--------|---------|
| `backend/app.py` | ✨ NEW | Flask API with image analysis |
| `backend/process_image.py` | 🔧 Updated | Uses .env.local |
| `my-app/app/upload.tsx` | 🔧 Updated | Calls backend API |
| `requirements.txt` | 🔧 Updated | Added Flask & CORS |
| `DEVELOPMENT.md` | ✨ NEW | Dev setup guide |
| `start-backend.ps1` | ✨ NEW | Backend startup |
| `start-frontend.ps1` | ✨ NEW | Frontend startup |
| `setup-dev.ps1` | ✨ NEW | One-time setup |

---

## 🎉 Next Steps

1. Run `.\setup-dev.ps1` to install all dependencies
2. Start backend: `.\start-backend.ps1`
3. Start frontend: `.\start-frontend.ps1` (in another terminal)
4. Test the flow:
   - Upload an image
   - Watch it get analyzed by Google AI
   - See severity/title/summary populated
   - Create task with real data

---

## 🚀 Future Enhancements

- [ ] Add database to persist tasks
- [ ] Add authentication
- [ ] Add image caching
- [ ] Add batch processing
- [ ] Deploy to cloud (AWS/Azure/GCP)
- [ ] Add websocket for real-time updates

---

For detailed development information, see: **DEVELOPMENT.md**
