import { useState, useContext } from 'react';
import Cliente from './Cliente';
import Cuenta from './Cuenta';
import Usuario from './Usuario';
import { AuthContext } from '../context/AuthContext';

const Services = () => {
  const [component, setComponent] = useState('');
  const { user} = useContext(AuthContext);
  return (
    <div className="container">
      <h1>Servicios</h1>
      {user && (
        <div className="btn-group mb-3 mt-5">
          <button onClick={() => setComponent('cliente')} className="btn btn-primary m-1">Cliente</button>
          <button onClick={() => setComponent('cuenta')} className="btn btn-primary m-1">Cuentas</button>
        </div>
      )}
      {user && (
        <div>
          {component === 'cliente' && <Cliente />}
          {component === 'cuenta' && <Cuenta />}
        </div>
      )}
    </div>
  );
};

export default Services;

