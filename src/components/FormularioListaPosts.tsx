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

    return (
        <div>
            <h1>Lista de Posts</h1>
            <Link to="/CrearPost">Crear Post</Link>
            <ul>
                {posts.map((post) => (
                    <li key={post._id}>
                        <div>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <p>Autor: {post.author.name} ({post.author.email})</p>
                            <p>Likes: {post.likes.length}</p>
                        </div>
                        <Link to={`/EditarPost/${post._id}`} >Editar Post</Link>
                        <button>Me gusta</button>
                        <button>No me gusta</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
