import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();


    const existingUser = localStorage.getItem('user');
    if (existingUser) {
      setError('El usuario ya está registrado.');
    } else {

      const newUser = { username, password };
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate('/login'); 
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-register">Registro</h1>
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
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
