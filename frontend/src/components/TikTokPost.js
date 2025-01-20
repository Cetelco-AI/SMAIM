import React, { useState } from 'react';
import axios from 'axios';

const TikTokPost = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/post/tiktok', {
                video_url: videoUrl,
                description: description,
            });
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Publicar en TikTok</h2>
            <input 
                type="text" 
                placeholder="URL del video" 
                value={videoUrl} 
                onChange={(e) => setVideoUrl(e.target.value)} 
                required 
            />
            <textarea 
                placeholder="Descripción del video" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
            />
            <button type="submit">