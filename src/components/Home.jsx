import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="mensaje-bienvenida">
      {user ? <h1>Bienvenido, {user.username}!</h1> : <h1>Por favor inicia sesión</h1>}
    </div>
  );
};

export default Home;
