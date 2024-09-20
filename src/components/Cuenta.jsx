import { useState } from 'react';

const Cuenta = () => {
  const [cuentas, setCuentas] = useState([]);
  const [numeroCuenta, setNumeroCuenta] = useState(''); // Almacenar el número de cuenta
  const [newCuenta, setNewCuenta] = useState({
    numeroCuenta: '',
    documentoCliente: '',
    claveAcceso: '',
  });
  const [monto, setMonto] = useState(0); // Para consignar o retirar dinero

  const handleConsultarCuenta = () => {
    fetch(`https://api-banco-clase.onrender.com/api/cuentas/${numeroCuenta}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Cuenta no encontrada');
        }
        return response.json();
      })
      .then(data => setCuentas([data]))
      .catch(error => console.error('Error al obtener cuenta:', error));
  };

  const handleAddCuenta = () => {
    fetch('https://api-banco-clase.onrender.com/api/cuentas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCuenta),
    })
      .then(() => {
        setCuentas([...cuentas, newCuenta]);
        setNewCuenta({ numeroCuenta: '', documentoCliente: '', claveAcceso: '' });
      })
      .catch(error => console.error('Error al agregar cuenta:', error));
  };

  const handleDeleteCuenta = (numeroCuenta) => {
    fetch(`https://api-banco-clase.onrender.com/api/cuentas/${numeroCuenta}`, {
      method: 'DELETE',
    })
      .then(() => setCuentas(cuentas.filter(cuenta => cuenta.numeroCuenta !== numeroCuenta)))
      .catch(error => console.error('Error al eliminar cuenta:', error));
  };

  const handleConsignar = () => {
    if (!numeroCuenta || monto <= 0) {
      alert('Debe ingresar un número de cuenta válido y un monto mayor a cero');
      return;
    }
    
    fetch(`https://api-banco-clase.onrender.com/api/cuentas/consignar/${numeroCuenta}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ monto }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Error en la consignación:', data.error);
      } else {
        // Actualizar la cuenta después de consignar
        setCuentas(cuentas.map(c => c.numeroCuenta === numeroCuenta ? data : c));
        alert('Consignación realizada con éxito');
        
        // Limpiar los valores de los inputs
        setMonto(0);  // Limpia el monto
      }
    })
    .catch(error => console.error('Error al consignar dinero:', error));
  };
  
  const handleRetirar = () => {
    if (!numeroCuenta || monto <= 0) {
      alert('Debe ingresar un número de cuenta válido y un monto mayor a cero');
      return;
    }
  
    fetch(`https://api-banco-clase.onrender.com/api/cuentas/retirar/${numeroCuenta}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ monto }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Error en el retiro:', data.error);
      } else {
        // Actualizar la cuenta después de retirar
        setCuentas(cuentas.map(c => c.numeroCuenta === numeroCuenta ? data : c));
        alert('Retiro realizado con éxito');
        
        // Limpiar los valores de los inputs
        setMonto(0);  // Limpia el monto
      }
    })
    .catch(error => console.error('Error al retirar dinero:', error));
  };
  
  

  return (
    <div>
      <h2>Cuentas</h2>

      {/* Consultar Cuenta */}
      <input
        type="text"
        placeholder="Ingrese el Número de Cuenta"
        value={numeroCuenta}
        onChange={(e) => setNumeroCuenta(e.target.value)}
        className="form-control mb-2"
      />
      <button onClick={handleConsultarCuenta} className="btn btn-info mb-3">Consultar Cuenta</button>

      <ul className="list-group mb-3">
        {cuentas && cuentas.length > 0 ? (
          cuentas.map(cuenta => (
            <li key={cuenta._id} className="list-group-item d-flex justify-content-between align-items-center">
              {cuenta.numeroCuenta} - Saldo: {cuenta.saldo} - Cliente: {cuenta.documentoCliente}
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCuenta(cuenta.numeroCuenta)}>Eliminar</button>
            </li>
          ))
        ) : (
          <li className="list-group-item">No se encontraron cuentas.</li>
        )}
      </ul>
            {/* Consignar y Retirar */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Ingrese el Monto"
          value={monto}
          onChange={(e) => setMonto(Number(e.target.value))}
          className="form-control mb-2"
        />
        <button onClick={handleConsignar} className="btn btn-warning me-2">Consignar</button>
        <button onClick={handleRetirar} className="btn btn-secondary">Retirar</button>
      </div>

      {/* Agregar nueva cuenta */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Número de Cuenta"
          value={newCuenta.numeroCuenta}
          onChange={(e) => setNewCuenta({ ...newCuenta, numeroCuenta: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Documento Cliente"
          value={newCuenta.documentoCliente}
          onChange={(e) => setNewCuenta({ ...newCuenta, documentoCliente: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="password"
          placeholder="Clave de Acceso"
          value={newCuenta.claveAcceso}
          onChange={(e) => setNewCuenta({ ...newCuenta, claveAcceso: e.target.value })}
          className="form-control mb-2"
        />
        <button onClick={handleAddCuenta} className="btn btn-success">Agregar Cuenta</button>
      </div>
    </div>
  );
};

export default Cuenta;
