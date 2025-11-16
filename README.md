# JanAI

A mobile application that uses AI to analyze images of cleaning issues and create actionable tasks. Built with React Native/Expo on the frontend and Flask on the backend.

## Features

- **Image Upload**: Capture photos via camera or select from gallery
- **AI Analysis**: Uses Google Generative AI to analyze cleanliness issues
- **Task Management**: Create, view, and track cleaning tasks
- **Severity Tracking**: Issues are ranked 1-10 for priority assessment
- **Location Management**: Track tasks by building and room number
- **Detailed Task View**: Full image display with comprehensive issue descriptions

## Project Structure

```
Janai/
├── backend/
│   ├── app.py                 # Flask REST API server
│   ├── process_image.py       # Google AI image analysis logic
│   ├── requirements.txt       # Python dependencies
│   └── model_output.json      # Sample analysis output
├── my-app/                    # React Native/Expo frontend
│   ├── app/
│   │   ├── index.tsx         # Homepage with upload button
│   │   ├── upload.tsx        # Image capture and upload screen
│   │   ├── tasks.tsx         # Task list view
│   │   ├── [taskId].tsx      # Task detail view
│   │   ├── taskStore.tsx     # Global state management
│   │   └── _layout.tsx       # Navigation layout
│   ├── components/           # Reusable React components
│   ├── hooks/                # Custom React hooks
│   ├── constants/            # App constants (theme, etc)
│   └── config/               # Configuration files
└── README.md
```

## Tech Stack

**Backend:**
- Python 3.x
- Flask 3.0.0
- Flask-CORS 4.0.0
- Google Generative AI API

**Frontend:**
- React Native
- Expo (~54.0.23)
- TypeScript
- React Context API for state management

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.8+
- Expo CLI
- Google Generative AI API key

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd recallify
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   python -m venv venv
   .\venv\Scripts\activate  # Windows
   # or
   source venv/bin/activate  # macOS/Linux
   
   pip install -r requirements.txt
   ```

3. **Frontend Setup:**
   ```bash
   cd my-app
   npm install
   ```

### Configuration

Create a `.env.local` file in the `backend/` directory:
```
GOOGLE_API_KEY=your_api_key_here
```

Create a `config/environment.ts` file in `my-app/` to set your API base URL:
```typescript
export const API_BASE_URL = "http://your-machine-ip:5000"
```

### Running the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
python app.py
```

**Terminal 2 - Start Frontend (Web):**
```bash
cd my-app
npm start
```

**Terminal 3 - Start Frontend (Mobile/Expo Go):**
```bash
cd my-app
npx expo start
```

Then scan the QR code with Expo Go app on your phone.

## API Endpoints

- `POST /api/analyze-image` - Upload image file for analysis
- `POST /api/analyze-image-base64` - Upload base64 encoded image
- `GET /api/health` - Health check

## How It Works

1. User captures or selects an image of a cleaning issue
2. Image is sent to Flask backend as base64
3. Google Generative AI analyzes the image and generates:
   - Issue title
   - Severity score (1-10)
   - Detailed summary
4. Task is created and stored locally
5. User can view task details, mark complete, or delete

## Task Model

Each task contains:
- `id`: Unique identifier
- `image`: Base64 encoded image data
- `severity`: 1-10 scale
- `title`: AI-generated issue title
- `summary`: Detailed issue description
- `building`: Building identifier
- `roomNumber`: Room identifier

## Development Notes

- Hot reload enabled for both backend and frontend
- Phone testing requires correct IP configuration
- Images are stored as base64 in app state (not persistent)
- All dependencies are pinned to specific versions for reproducibility
