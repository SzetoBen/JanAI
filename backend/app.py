import os
from pathlib import Path
import dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from process_image import categorize_image
import json
import tempfile

# Load environment from .env.local
env_path = Path(__file__).parent / ".env.local"
dotenv.load_dotenv(env_path)

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({"status": "ok", "message": "Backend API is running"}), 200

@app.route('/api/analyze-image', methods=['POST'])
def analyze_image():
    """
    Analyze an image for cleanliness issues
    
    Expected: multipart/form-data with 'image' file
    Returns: JSON with severity, title, summary
    """
    try:
        # Check if image file is present
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400
        
        file = request.files['image']
        
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        # Validate file is an image
        if not file.content_type.startswith('image/'):
            return jsonify({"error": "File must be an image"}), 400
        
        # Save to temporary file
        with tempfile.NamedTemporaryFile(suffix='.jpg', delete=False) as tmp:
            file.save(tmp.name)
            temp_path = tmp.name
        
        try:
            # Process the image
            result_json = categorize_image(temp_path)
            
            # Parse the JSON response
            if result_json:
                result = json.loads(result_json)
            else:
                return jsonify({"error": "Failed to analyze image"}), 500
            
            return jsonify(result), 200
        
        finally:
            # Clean up temporary file
            if os.path.exists(temp_path):
                os.remove(temp_path)
    
    except json.JSONDecodeError:
        return jsonify({"error": "Invalid JSON response from AI"}), 500
    except Exception as e:
        print(f"Error analyzing image: {str(e)}")
        return jsonify({"error": f"Error analyzing image: {str(e)}"}), 500

@app.route('/api/analyze-image-base64', methods=['POST'])
def analyze_image_base64():
    """
    Alternative endpoint that accepts base64 encoded image
    
    Expected: JSON with { "image": "base64_string" }
    Returns: JSON with severity, title, summary
    """
    try:
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({"error": "No image data provided"}), 400
        
        import base64
        
        # Decode base64 image
        try:
            image_data = base64.b64decode(data['image'])
        except Exception as e:
            return jsonify({"error": f"Invalid base64 data: {str(e)}"}), 400
        
        # Save to temporary file
        with tempfile.NamedTemporaryFile(suffix='.jpg', delete=False) as tmp:
            tmp.write(image_data)
            temp_path = tmp.name
        
        try:
            # Process the image
            result_json = categorize_image(temp_path)
            
            # Parse the JSON response
            if result_json:
                result = json.loads(result_json)
            else:
                return jsonify({"error": "Failed to analyze image"}), 500
            
            return jsonify(result), 200
        
        finally:
            # Clean up temporary file
            if os.path.exists(temp_path):
                os.remove(temp_path)
    
    except json.JSONDecodeError:
        return jsonify({"error": "Invalid JSON response from AI"}), 500
    except Exception as e:
        print(f"Error analyzing image: {str(e)}")
        return jsonify({"error": f"Error analyzing image: {str(e)}"}), 500

if __name__ == '__main__':
    print("Starting Recallify Backend API...")
    print("API available at: http://localhost:5000")
    print("Health check: http://localhost:5000/api/health")
    app.run(debug=True, host='0.0.0.0', port=5000)
