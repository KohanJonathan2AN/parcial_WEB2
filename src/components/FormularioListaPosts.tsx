import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Post = {
    _id: string;
    title: string;
    content: string;
    author: {
        name: string;
        email: string;
    };
    likes: {
        _id: string;
        name: string;
        email: string;
    }[];
};

export const RecuperacionPosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:2565/posts');
                console.log('Posts recuperados:', res.data);
                setPosts(res.data.data);
            } catch (error) {
                console.error('Error al recuperar los posts', error);
            }
        };
        fetchPosts();
    }, []);

const usuarioID = localStorage.getItem('usuarioID');

const usuarioLeDioMeGusta = (post: Post): boolean => {
    if (!usuarioID){
        console.error ('Debes registrarte para interactuar con los posts');
        return false;
    } 
    return post.likes.some(like => like._id === usuarioID);
};

const PonerSacarMeGusta = async (postId: string) => {
    if (!usuarioID) {
      console.error('Debes registrarte para interactuar con los posts');
      return;
    }
    try {
        const postActual = posts.find(post => post._id === postId);
        if (!postActual) {
            console.error('Post no encontrado.');
            return;
        }
        const ApretoBotonMeGusta = usuarioLeDioMeGusta(postActual);
        if (ApretoBotonMeGusta) {
            await axios.patch(`http://localhost:2565/posts/${postId}/unlike`, {userId: usuarioID});
        } else {
            await axios.patch(`http://localhost:2565/posts/${postId}/like`, {userId: usuarioID});
        }
        const res = await axios.get('http://localhost:2565/posts');
        setPosts(res.data.data);
    }
    catch (error) {
      console.error('Error al alternar el me gusta del post:', error);
    }
};

    return (
        <div>
            <h1>Lista de Posts</h1>
            <button><Link to="/CrearPost" style={{color: 'red'}}>Crear Post</Link></button>
            <ul>
                {posts.map((post) => (
                    <li key={post._id}>
                        <div>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <p>Autor: {post.author.name} ({post.author.email})</p>
                            <p>Likes: {post.likes.length}</p>
                        </div>
                        <button><Link to={`/EditarPost/${post._id}`} >Editar Post</Link></button>
                        <button onClick={() => PonerSacarMeGusta(post._id)}>
                            {usuarioLeDioMeGusta(post) ? 'Quitar Me gusta' : 'Me gusta'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
