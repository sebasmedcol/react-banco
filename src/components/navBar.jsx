import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <ul>
      <li>
          <img
            src="https://i.pinimg.com/564x/fd/46/45/fd46457189cf25bf018de0b414072530.jpg"
            alt="Icon"
            className="rounded-circle"
            width="50"
            height="50"
            border-radius="50%"
          />
        </li>
        <li><Link to="/">Inicio</Link></li>

        {user && (<li><Link to="/services">Servicios</Link></li>)}

        <li><Link to="/contacts">Contactos</Link></li>

        {!user && (
          <li><Link to="/register">Registro</Link></li>
        )}

        
        {!user ? (
          <li><Link to="/login">Login</Link></li>
        ) : (
          <>
            <li className="welcome-message">{`Bienvenido, ${user.username}`}</li>
            <li><button onClick={logout}>Salir</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
