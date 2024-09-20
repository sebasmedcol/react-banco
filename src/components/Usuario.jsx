import { useState, useEffect } from 'react';

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [newUsuario, setNewUsuario] = useState({
    nombreUsuario: '',
    password: '',
    estado: ''
  });

  useEffect(() => {
    fetch('/api/usuarios')
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error al obtener usuarios:', error));
  }, []);

  const handleAddUsuario = () => {
    fetch('/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUsuario),
    })
    .then(() => {
      setUsuarios([...usuarios, newUsuario]);
      setNewUsuario({ nombreUsuario: '', password: '', estado: '' });
    })
    .catch(error => console.error('Error al agregar usuario:', error));
  };

  const handleDeleteUsuario = (id) => {
    fetch(`/api/usuarios/${id}`, {
      method: 'DELETE',
    })
    .then(() => setUsuarios(usuarios.filter(usuario => usuario._id !== id)))
    .catch(error => console.error('Error al eliminar usuario:', error));
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <ul className="list-group mb-3">
        {usuarios.map(usuario => (
          <li key={usuario._id || index} className="list-group-item d-flex justify-content-between align-items-center">
            {usuario.nombreUsuario} - Estado: {usuario.estado ? 'Activo' : 'Inactivo'}
            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUsuario(usuario._id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Nombre de Usuario"
        value={newUsuario.nombreUsuario}
        onChange={(e) => setNewUsuario({ ...newUsuario, nombreUsuario: e.target.value })}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={newUsuario.password}
        onChange={(e) => setNewUsuario({ ...newUsuario, password: e.target.value })}
      />
      <select
        value={newUsuario.estado}
        onChange={(e) => setNewUsuario({ ...newUsuario, estado: e.target.value })}
      >
        <option value="">Seleccionar Estado</option>
        <option value="true">Activo</option>
        <option value="false">Inactivo</option>
      </select>
      <button onClick={handleAddUsuario} className="btn btn-success">Agregar Usuario</button>
    </div>
  );
};

export default Usuario;
