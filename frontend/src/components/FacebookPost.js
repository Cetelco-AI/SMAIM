import React, { useState } from 'react';
import axios from 'axios';

const handleGenerateContent = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/generate-content', {
            prompt: "Write a terrific message for a Facebook post about a new product."
        });
        setMessage(response.data.content);
    } catch (error) {
        alert("Error generating content: " + error.response.data.error.message);
    }
};


const FacebookPost = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/post/facebook', {
                message: message,
            });
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Publicar en Facebook</h2>
            <textarea 
                placeholder="Texto de la publicación" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                required 
            />
            <button type="submit">Publicar</button>
        </form>
    );
};

export default FacebookPost;
