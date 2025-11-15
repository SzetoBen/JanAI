import base64
import os
from google import genai
from google.genai import types
import dotenv
import json

dotenv.load_dotenv()

prompt = '''
You are an image-analysis AI designed to evaluate cleanliness issues in school facilities.
Analyze the provided image and extract the following information:

severity — A number between 1 and 10 indicating how urgently a janitor should address the issue.
1 = extremely minor (e.g., slightly tilted trash bin, minor scuff marks)
5 = moderate mess (e.g., small spill, full trash can, messy table)
10 = severe hazard (e.g., large spill, broken glass, hazardous materials, biohazard)

title — A short 2-6 word title that describes the mess (e.g., “Large hallway spill”, “Overflowing trash bin”).

summary — A one-sentence plain-English explanation of what the mess appears to be and why it needs attention.

Return the output only in the following strict JSON format:

{
  "severity": <number from 1 to 10>,
  "title": "<short descriptive title>",
  "summary": "<one sentence explanation>"
}

Do not include any additional text, notes, explanations, or formatting outside the JSON.
'''

def extract_braces_content(input_string):
    result = []
    inside_braces = False
    temp = ""
    for char in input_string:
        if char == "{":
            inside_braces = True
            temp = "{"  # Start collecting new content
        elif char == "}":
            if inside_braces:
                result.append(temp + "},")  # Store collected content
            inside_braces = False
        elif inside_braces:
            temp += char  # Collect characters inside braces
    return " ".join(result)[:-1]

def categorize_image(image_path):
    client = genai.Client(
        api_key=os.environ.get("GOOGLE_API_KEY"),
    )

    model = "gemini-2.5-flash-lite"
    
    with open(image_path, 'rb') as f:
        image_bytes = f.read()
    
    contents = [
        types.Part.from_bytes(
                data=image_bytes,
                mime_type='image/jpeg', # Adjust MIME type as needed
            ),
        prompt
    ]
    generate_content_config = types.GenerateContentConfig(
        thinking_config = types.ThinkingConfig(
            thinking_budget=-1,
        ),
        image_config=types.ImageConfig(
            image_size="1K",
        ),  
    )

    response = ""
    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ): 
        if chunk.text:
            response += chunk.text
    
    return extract_braces_content(response)
