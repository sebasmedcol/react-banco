import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      
      if (username === parsedUser.username && password === parsedUser.password) {
        login(username);
        navigate('/'); 
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } else {
      setError('No se encontró ningún usuario registrado');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-register">Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
