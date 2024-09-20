import { useState, useEffect } from 'react';

const Cliente = () => {
  const [clientes, setClientes] = useState([]);
  const [newCliente, setNewCliente] = useState({
    documentoCliente: '',
    nombreCompleto: '',
    celular: '',
    fechaNacimiento: ''
  });

  // Obtener todos los clientes al cargar el componente
  useEffect(() => {
    fetch('https://api-banco-clase.onrender.com/api/clientes') // Usa la URL completa de la API
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error al obtener clientes:', error));
  }, []);

  // Agregar un nuevo cliente
  const handleAddCliente = () => {
    fetch('https://api-banco-clase.onrender.com/api/clientes', { // Usa la URL completa de la API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCliente),
    })
    .then(() => {
      setClientes([...clientes, newCliente]);
      setNewCliente({ documentoCliente: '', nombreCompleto: '', celular: '', fechaNacimiento: '' });
    })
    .catch(error => console.error('Error al agregar cliente:', error));
  };

  // Eliminar un cliente
  const handleDeleteCliente = (id) => {
    fetch(`https://api-banco-clase.onrender.com/api/clientes/${id}`, { // Usa la URL completa de la API
      method: 'DELETE',
    })
    .then(() => setClientes(clientes.filter(cliente => cliente._id !== id)))
    .catch(error => console.error('Error al eliminar cliente:', error));
  };

  return (
    <div>
      <h2>Lista Clientes</h2>
      <ul className="list-group mb-3">
        {clientes.map(cliente => (
          <li key={cliente._id} className="list-group-item d-flex justify-content-between align-items-center">
            {cliente.nombreCompleto}
            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCliente(cliente._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <h3 className="mt-3">Agregar Clientes</h3>
      <input
        type="text"
        placeholder="Documento Cliente"
        value={newCliente.documentoCliente}
        onChange={(e) => setNewCliente({ ...newCliente, documentoCliente: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nombre Completo"
        value={newCliente.nombreCompleto}
        onChange={(e) => setNewCliente({ ...newCliente, nombreCompleto: e.target.value })}
      />
      <input
        type="text"
        placeholder="Celular"
        value={newCliente.celular}
        onChange={(e) => setNewCliente({ ...newCliente, celular: e.target.value })}
      />
      <input
        type="date"
        value={newCliente.fechaNacimiento}
        onChange={(e) => setNewCliente({ ...newCliente, fechaNacimiento: e.target.value })}
      />
      <button onClick={handleAddCliente} className="btn btn-success m-3">Agregar Cliente</button>
    </div>
  );
};

export default Cliente;
