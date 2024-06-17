import React, { useEffect, useState } from 'react';
import Accordion from './Acordeon';
import './Clientes.css';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirección

const Creditos = () => {
  const [identificacion, setIdentificacion] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [Credito, setCredito] = useState([]);
  const [consultaId, setConsultaId] = useState('');
  const [creditosFiltrados, setCreditosFiltrados] = useState([]);
  const [nombre, setNombre] = useState([]);
  const [formData, setFormData] = useState({
    nomCompleto: '',
    id: '',
    montoCredito: '',
    plazoCuotas: '',
    fechaSolicitud: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [editingCreditId, setEditingCreditId] = useState(null);

  const navigate = useNavigate(); // Hook para redirección

  useEffect(() => {
    const storedCreditos = localStorage.getItem('credito');
    if (storedCreditos) {
      setCredito(JSON.parse(storedCreditos));
    }
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nomCompleto || !formData.id || !formData.montoCredito || !formData.plazoCuotas || !formData.fechaSolicitud) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (editMode) {
      // Editar el crédito existente
      const updatedCredito = Credito.map((creditos) =>
        creditos.numeroCredito === editingCreditId ? { ...formData, numeroCredito: editingCreditId } : creditos
      );
      setCredito(updatedCredito);
      localStorage.setItem('credito', JSON.stringify(updatedCredito));
      setEditMode(false);
      setEditingCreditId(null);
    } else {
      // Crear un nuevo crédito
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      const numeroRand = Math.floor(Math.random() * 10000) + 1;
      const estado = randomNumber < 50 ? 'Denegado' : 'Aprobado';

      const updatedFormData = {
        ...formData,
        nomCompleto: nombreCompleto,
        id: identificacion,
        numeroRandom: randomNumber,
        estadoCredito: estado,
        numeroCredito: numeroRand
      };

      const newCredito = [...Credito, updatedFormData];
      setCredito(newCredito);
      localStorage.setItem('credito', JSON.stringify(newCredito));
    }

    setFormData({
      nomCompleto: '',
      id: '',
      montoCredito: '',
      plazoCuotas: '',
      fechaSolicitud: '',
    });
    setNombreCompleto('');
    setIdentificacion('');
  };

  const handleChangeIdentificacion = (e) => {
    const id = e.target.value;
    setIdentificacion(id);
  };

  const handleConsultar = (e) => {
    e.preventDefault();
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find((user) => user.numeroDocu === identificacion);

    if (usuario) {
      const nombreCom = `${usuario.primerNombre} ${usuario.segundoNombre} ${usuario.primerApellido} ${usuario.segundoApellido}`;
      setNombreCompleto(nombreCom);
      setFormData((prevData) => ({
        ...prevData,
        nomCompleto: nombreCompleto,
        id: identificacion,
      }));
    } else {
      setNombreCompleto('Usuario no encontrado');
    }
  };

  const handleChangeConsultaId = (e) => {
    setConsultaId(e.target.value);
  };

  const handleConsultarCredito = (e) => {
    e.preventDefault();
    if (consultaId) {
      const credEncontrados = Credito.filter(credito => credito.id === consultaId);
      setCreditosFiltrados(credEncontrados);
    } else {
      setCreditosFiltrados([]);
    }
    document.getElementById('consultar-credito').reset();
  };

  

 //const handlePagar = (numeroCredito) => {
   // navigate(`/pagos/${numeroCredito}`);
  //};

  const handlePagar = (numeroCredito, id) => {
    const usuario =  JSON.parse(localStorage.getItem('credito')) || [] 
    const uss = usuario.find((user) => user.id === id);
    console.log(uss)
    const nombre = `${uss.nomCompleto}`;
    const monto = `${uss.montoCredito}`
    setNombre(nombre)
    console.log(nombre)
    navigate(`/pagos/${numeroCredito}`, {
      state: {
        numeroCredito: numeroCredito,
        nomCompleto: nombre,
        identificacion: id,
        monto: monto
      }
    });
    //console.log(nombreCompleto)
  };
  


  const handleEditar = (numeroCredito) => {
    const credito = Credito.find((credito) => credito.numeroCredito === numeroCredito);
    if (credito) {
      setFormData(credito);
      setEditMode(true);
      setEditingCreditId(numeroCredito);
    }
  };

  return (
    <div className='formulario'>
      <Accordion title="Crear Credito">
        <form id="crear-credito-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="nombre">Nombre Completo:</label>
            <input
              type="text"
              id="nombre"
              value={nombreCompleto}
              readOnly
            />
          </div>
          <div className="input-group">
            <label htmlFor="identificacion">Identificación:</label>
            <input
              type="text"
              id="identificacion"
              value={identificacion}
              onChange={handleChangeIdentificacion}
            />
          </div>
          <div className="input-group">
            <label htmlFor="monto">Monto del Crédito:</label>
            <input
              type="number"
              id="monto"
              name="montoCredito"
              value={formData.montoCredito}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="plazo">Plazo de Cuotas (Meses):</label>
            <select
              id="plazo"
              name="plazoCuotas"
              value={formData.plazoCuotas}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              <option value="12">12 Meses</option>
              <option value="24">24 Meses</option>
              <option value="36">36 Meses</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="fecha">Fecha de Solicitud:</label>
            <input
              type="date"
              id="fecha"
              name="fechaSolicitud"
              value={formData.fechaSolicitud}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <button type="submit">
              {editMode ? 'Guardar Cambios' : 'Crear Crédito'}
            </button>
          </div>
          <div className="input-group">
            <button type="button" onClick={handleConsultar} >
              Consultar Usuario
            </button>
          </div>
        </form>
      </Accordion>

      <Accordion title="Consultar Credito">
        <form id="consultar-credito" action="#" method="post" onSubmit={handleConsultarCredito}>
          <div className="input-group">
            <label htmlFor="identificacion">Identificación:</label>
            <input
              type="text"
              id="identificacion"
              value={consultaId}
              onChange={handleChangeConsultaId}
            />
          </div>
          <div className="input-group">
            <button type="submit">
              Consultar Usuario
            </button>
          </div>
        </form>
        {creditosFiltrados.length > 0 && (
          <div className='table'>
            <h2>Creditos Creados</h2>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre Completo</th>
                  <th>Identificación</th>
                  <th>Monto Del Credito</th>
                  <th>Plazo De Las Cuotas</th>
                  <th>Fecha de Solicitud</th>
                  <th>Puntaje</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {creditosFiltrados.map((creditos, index) => (
                  <tr key={index}>
                    <td>{creditos.numeroCredito}</td>
                    <td>{creditos.nomCompleto}</td>
                    <td>{creditos.id}</td>
                    <td>{creditos.montoCredito}</td>
                    <td>{creditos.plazoCuotas}</td>
                    <td>{creditos.fechaSolicitud}</td>
                    <td>{creditos.numeroRandom}</td>
                    <td>{creditos.estadoCredito}</td>
                    <td>
                      {creditos.estadoCredito === 'Aprobado' && (
                        <button onClick={() => handlePagar(creditos.numeroCredito, creditos.id)}>Pagar</button>
                      )}
                      <button onClick={() => handleEditar(creditos.numeroCredito, creditos.id)}>Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Accordion>
    </div>
  );
};

export default Creditos;
