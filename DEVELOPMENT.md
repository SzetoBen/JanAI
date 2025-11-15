# Local Development Setup Guide

This guide will help you run both the frontend (Expo React Native) and backend (Flask API) locally.

## Quick Start

### 1. Initial Setup (One-time)
Run this to set up both environments:

```powershell
.\setup-dev.ps1
```

This will:
- Create a Python virtual environment
- Install Python dependencies from `requirements.txt`
- Install Node.js dependencies for the frontend

### 2. Start the Development Servers

You'll need **two separate terminal windows**.

#### Terminal 1 - Backend API

```powershell
.\start-backend.ps1
```

Output should show:
```
Backend API starting on http://localhost:5000
Health check: http://localhost:5000/api/health
```

To verify it's running, visit: http://localhost:5000/api/health

#### Terminal 2 - Frontend (Expo)

```powershell
.\start-frontend.ps1
```

Output should show Expo startup options:
```
› Press i │ iOS
› Press a │ Android
› Press w │ Web
› Press r │ Restart
› Press q │ Quit
```

Choose your option (e.g., `w` for web)

---

## Project Structure

```
recallify/
├── backend/                    # Python Flask API
│   ├── app.py                 # Flask application with endpoints
│   ├── process_image.py       # Image analysis logic (Google AI)
│   ├── .env.local            # Backend environment variables (not in git)
│   ├── .env.example          # Template for .env.local
│   └── requirements.txt       # Python dependencies
│
├── my-app/                    # React Native/Expo Frontend
│   ├── package.json
│   ├── app/
│   │   ├── upload.tsx       # Updated to call backend API
│   │   └── ...
│   └── ...
│
├── requirements.txt           # All Python dependencies
├── package.json              # Root workspace config
├── start-backend.ps1         # Script to start backend
├── start-frontend.ps1        # Script to start frontend
└── setup-dev.ps1            # One-time setup script
```

---

## Backend API Endpoints

### Health Check
```
GET http://localhost:5000/api/health
Response: { "status": "ok", "message": "Backend API is running" }
```

### Analyze Image (Base64)
```
POST http://localhost:5000/api/analyze-image-base64
Content-Type: application/json

Body:
{
  "image": "base64_encoded_image_string"
}

Response:
{
  "severity": 3,
  "title": "Detected Mess Area",
  "summary": "Clutter detected..."
}
```

### Analyze Image (Multipart)
```
POST http://localhost:5000/api/analyze-image
Content-Type: multipart/form-data

Body: FormData with 'image' file

Response:
{
  "severity": 3,
  "title": "Detected Mess Area",
  "summary": "Clutter detected..."
}
```

---

## Frontend Integration

The frontend (`my-app/app/upload.tsx`) has been updated to:

1. **Pick image** from device gallery
2. **Convert to base64** encoding
3. **Send to backend** via `POST /api/analyze-image-base64`
4. **Receive analysis** (severity, title, summary)
5. **Create task** with the AI response
6. **Navigate** to tasks list

The API base URL is set to `http://localhost:5000` by default (configurable in `upload.tsx`).

---

## Troubleshooting

### Backend won't start
```
Error: Port 5000 already in use
```
→ Kill the process using port 5000 or change the port in `backend/app.py`

### Frontend can't reach backend
```
Error: Failed to analyze image. Make sure the backend is running at http://localhost:5000
```
→ Make sure `start-backend.ps1` is running in another terminal

### Python venv issues
```
& : File ... cannot be loaded because running scripts is disabled
```
→ Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### Missing dependencies
```
ModuleNotFoundError: No module named 'flask'
```
→ Run: `pip install -r requirements.txt` (with venv activated)

---

## Environment Variables

### Backend (.env.local)
```env
GOOGLE_API_KEY=your_api_key_here
```

Get your Google API key from: https://ai.google.dev/

### Frontend
No additional setup needed for local development. The API URL is hardcoded to `http://localhost:5000`.

---

## Next Steps

- **Testing**: Use Postman or cURL to test API endpoints
- **Mobile Testing**: Use Expo's iOS/Android preview
- **Deployment**: See deployment guides (coming soon)
- **Database**: Consider adding persistence for tasks
