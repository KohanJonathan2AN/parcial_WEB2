import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export const CrearPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const usuarioId = localStorage.getItem('usuarioID');
      if (!usuarioId) {
        console.error('Usuario no registrado');
        return;
      }
      const res = await axios.post('http://localhost:2565/posts', {
        title,
        content,
        authorId: usuarioId,
      });
      console.log('Post creado:', res.data);
      navigate('/ListaDePosts');
    }
    catch (error) {
        console.error('Error al crear el post:', error);
    }
  };
  return (
    <div>
      <h1>Crear Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título</label>
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
        </div>
        <div>
          <label htmlFor="content">Contenido</label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required/>
        </div>
        <button type="submit">Crear Post</button>
      </form>
    </div>
  );
};