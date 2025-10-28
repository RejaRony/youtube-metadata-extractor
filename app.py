from flask import Flask, render_template, request, jsonify
import os
import re
from googleapiclient.discovery import build
from isodate import parse_duration 

app = Flask(__name__)

# --- CRITICAL: API KEY SECURITY ---
# This reads the key from the environment variable you set on Render.
YOUTUBE_API_KEY = os.environ.get("YOUTUBE_API_KEY")

@app.route('/')
def index():
    # Flask serves your HTML file from the 'templates' folder.
    return render_template('index.html')

# --- Helper Functions ---
def extract_video_id(url):
    """Extracts Video ID from various YouTube URL formats."""
    # Matches /watch?v=ID and /youtu.be/ID
    match = re.search(r"(?<=v=)[\w-]+|(?<=youtu\.be/)[\w-]+", url)
    return match.group(0) if match else None

def format_duration(iso_duration):
    """Converts ISO 8601 duration string (PT#M#S) to HH:MM:SS format."""
    duration = parse_duration(iso_duration)
    total_seconds = int(duration.total_seconds())
    
    hours = total_seconds // 3600
    minutes = (total_seconds % 3600) // 60
    seconds = total_seconds % 60
    
    # Ensure all parts have 2 digits
    return f"{hours:02}:{minutes:02}:{seconds:02}"


@app.route('/extract_details', methods=['POST'])
def extract_details():
    if not YOUTUBE_API_KEY:
        return jsonify({'error': 'API Key not configured on the server.'}), 500
        
    try:
        data = request.get_json()
        youtube_url = data.get('url')

        video_id = extract_video_id(youtube_url)
        if not video_id:
            return jsonify({'error': 'Invalid YouTube URL provided.'}), 400

        # Initialize YouTube Client
        youtube = build("youtube", "v3", developerKey=YOUTUBE_API_KEY)

        # API Call: Get Snippet, ContentDetails (for duration)
        video_response = youtube.videos().list(
            part="snippet,contentDetails",
            id=video_id
        ).execute()

        if not video_response.get('items'):
            return jsonify({'error': 'Video not found or is private.'}), 404

        item = video_response['items'][0]
        
        # Process Duration and Details
        iso_duration = item['contentDetails']['duration']
        formatted_duration = format_duration(iso_duration)

        details = {
            'title': item['snippet']['title'],
            'description': item['snippet']['description'],
            'publishedAt': item['snippet']['publishedAt'][:10], # Keep only the date part
            'videoId': video_id,
            'duration_formatted': formatted_duration,
            'thumbnail_url': item['snippet']['thumbnails']['medium']['url']
        }

        return jsonify(details)

    except Exception as e:
        print(f"Error processing YouTube API: {e}")
        return jsonify({'error': f'An API error occurred: {str(e)}'}), 500

if __name__ == '__main__':
    # Flask needs a 'templates' folder for index.html
    if not os.path.exists('templates'):
        os.makedirs('templates')
    # Run in debug mode only for local testing
    app.run(debug=True)
