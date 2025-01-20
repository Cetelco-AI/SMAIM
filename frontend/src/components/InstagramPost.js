import React, { useState } from 'react';
import axios from 'axios';

const InstagramPost = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [caption, setCaption] = useState('');

    const handleGenerateContent = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/generate-content', {
                prompt: "write a footprint message for a new product."
            });
            setCaption(response.data.content);
        } catch (error) {
            alert("Error generating content: " + error.response.data.error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/post/instagram', {
                image_url: imageUrl,
                caption: caption,
            });
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Publicar en Instagram</h2>
            <input 
                type="text" 
                placeholder="URL de la imagen" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
                required 
            />
            <textarea 
                placeholder="Texto de la publicación" 
                value={caption} 
                onChange={(e) => setCaption(e.target.value)} 
                required 
            />
            <button type="button" onClick={handleGenerateContent}>Generar Contenido</button>
            <button type="submit">Publish</button>
        </form>
    );
};

export default InstagramPost;
