import { useState, useEffect } from 'react';

const Cliente = () => {
  const [clientes, setClientes] = useState([]);
  const [newCliente, setNewCliente] = useState({
    documentoCliente: '',
    nombreCompleto: '',
    celular: '',
    fechaNacimiento: ''
  });
  const [editingCliente, setEditingCliente] = useState(null); // Cliente que se está editando

  // Obtener todos los clientes al cargar el componente
  useEffect(() => {
    fetch('/api/clientes')
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error al obtener clientes:', error));
  }, []);

  // Agregar un nuevo cliente
  const handleAddCliente = () => {
    fetch('/api/clientes', {
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
    fetch(`/api/clientes/${id}`, {
      method: 'DELETE',
    })
    .then(() => setClientes(clientes.filter(cliente => cliente._id !== id)))
    .catch(error => console.error('Error al eliminar cliente:', error));
  };

  // Editar un cliente
  const handleEditCliente = (id) => {
    const clienteToEdit = clientes.find(cliente => cliente._id === id);
    setEditingCliente(clienteToEdit); // Cargar el cliente que se va a editar en el formulario
  };

  // Actualizar cliente (PUT)
  const handleUpdateCliente = () => {
    fetch(`/api/clientes/${editingCliente._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingCliente),
    })
    .then(() => {
      setClientes(clientes.map(cliente => 
        cliente._id === editingCliente._id ? editingCliente : cliente
      ));
      setEditingCliente(null); // Limpiar el estado de edición
    })
    .catch(error => console.error('Error al actualizar cliente:', error));
  };

  return (
    <div>
      <h2>Lista Clientes</h2>
      <ul className="list-group mb-3">
        {clientes.map(cliente => (
          <li key={cliente._id} className="list-group-item d-flex justify-content-between align-items-center">
            {cliente.nombreCompleto}
            <div>
              <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditCliente(cliente._id)}>Editar</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCliente(cliente._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      <h3 className="mt-3">{editingCliente ? 'Editar Cliente' : 'Agregar Clientes'}</h3>
      <input
        type="text"
        placeholder="Documento Cliente"
        value={editingCliente ? editingCliente.documentoCliente : newCliente.documentoCliente}
        onChange={(e) => editingCliente 
          ? setEditingCliente({ ...editingCliente, documentoCliente: e.target.value })
          : setNewCliente({ ...newCliente, documentoCliente: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nombre Completo"
        value={editingCliente ? editingCliente.nombreCompleto : newCliente.nombreCompleto}
        onChange={(e) => editingCliente 
          ? setEditingCliente({ ...editingCliente, nombreCompleto: e.target.value })
          : setNewCliente({ ...newCliente, nombreCompleto: e.target.value })}
      />
      <input
        type="text"
        placeholder="Celular"
        value={editingCliente ? editingCliente.celular : newCliente.celular}
        onChange={(e) => editingCliente 
          ? setEditingCliente({ ...editingCliente, celular: e.target.value })
          : setNewCliente({ ...newCliente, celular: e.target.value })}
      />
      <input
        type="date"
        value={editingCliente ? editingCliente.fechaNacimiento : newCliente.fechaNacimiento}
        onChange={(e) => editingCliente 
          ? setEditingCliente({ ...editingCliente, fechaNacimiento: e.target.value })
          : setNewCliente({ ...newCliente, fechaNacimiento: e.target.value })}
      />
      <button onClick={editingCliente ? handleUpdateCliente : handleAddCliente} className="btn btn-success m-3">
        {editingCliente ? 'Actualizar Cliente' : 'Agregar Cliente'}
      </button>
    </div>
  );
};

export default Cliente;
