from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv
import openai

# Load yor OpenAI API credentials
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/generate-content', methods=['POST'])
def generate_content():
    data = request.json
    prompt = data.get('prompt')

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # O el modelo que prefieras
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    generated_text = response.choices[0].message['content']
    return jsonify({'content': generated_text}), 200


load_dotenv()

app = Flask(__name__)

# Rutas de publicaciones
@app.route('/post/instagram', methods=['POST'])
def post_instagram():
    data = request.json
    image_url = data.get('image_url')
    caption = data.get('caption')

    url = f'https://graph.instagram.com/me/media?access_token={os.getenv("INSTAGRAM_ACCESS_TOKEN")}'
    payload = {
        'image_url': image_url,
        'caption': caption
    }
    response = requests.post(url, data=payload)
    
    if response.status_code == 200:
        return jsonify({'message': 'Publicación exitosa en Instagram!'}), 200
    else:
        return jsonify({'error': response.json()}), response.status_code

@app.route('/post/facebook', methods=['POST'])
def post_facebook():
    data = request.json
    message = data.get('message')

    url = f'https://graph.facebook.com/me/feed?access_token={os.getenv("FACEBOOK_ACCESS_TOKEN")}'
    payload = {'message': message}
    response = requests.post(url, data=payload)
    
    if response.status_code == 200:
        return jsonify({'message': 'Publicación exitosa en Facebook!'}), 200
    else:
        return jsonify({'error': response.json()}), response.status_code

@app.route('/post/tiktok', methods=['POST'])
def post_tiktok():
    data = request.json
    video_url = data.get('video_url')
    description = data.get('description')

    url = f'https://open-api.tiktok.com/media/upload/?access_token={os.getenv("TIKTOK_ACCESS_TOKEN")}'
    # Aquí deberías manejar la subida del video según la API de TikTok
    # Este es solo un ejemplo conceptual.
    
    payload = {
        'video_url': video_url,
        'description': description
    }
    response = requests.post(url, data=payload)

    if response.status_code == 200:
        return jsonify({'message': 'Publicación exitosa en TikTok!'}), 200
    else:
        return jsonify({'error': response.json()}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
