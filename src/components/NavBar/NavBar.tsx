import {Link} from 'react-router-dom';
import './NavBar.module.css';

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/Registro">Registro</Link></li>
        <li><Link to="/ListaRegistros">Lista de Registros</Link></li>
        <li><Link to="/ListaDePosts">Lista de Posts</Link></li>
      </ul>
    </nav>
  );
}