import { useState , useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router';

export const EditarPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`http://localhost:2565/posts/${id}`);
                setTitle(res.data.data.title);
                setContent(res.data.data.content);
            } catch (error) {
                console.error('Error al recuperar los posts', error);
            }
        };
        fetchPosts();
    }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const usuarioId = localStorage.getItem('usuarioID');
      if (!usuarioId) {
        console.error('Usuario no registrado');
        return;
      }
      const res = await axios.put(`http://localhost:2565/posts/${id}`, {
        title,
        content,
        authorId: usuarioId,
      });
      console.log('Post modificado:', res.data);
      navigate('/ListaDePosts');
    }
    catch (error) {
        console.error('Error al modificar el post:', error);
    }
  };
  return (
    <div>
      <h1>Editar Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título</label>
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
        </div>
        <div>
          <label htmlFor="content">Contenido</label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required/>
        </div>
        <button type="submit">Editar Post</button>
      </form>
    </div>
  );
};