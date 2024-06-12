import React, { useEffect, useState } from 'react';
import './Clientes.css';

const Creditos = () => {
  const [identificacion, setIdentificacion] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');

  const [formData, setFormData] = useState({
    nomCompleto: '',
    id: '',
    montoCredito: '',
    plazoCuotas: '',
    fechaSolicitud: '',
  });

  const [Credito, setCredito] = useState([]);

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

    const updatedFormData = {
      ...formData,
      nomCompleto: nombreCompleto,
      id: identificacion
    };

    const newCredito = [...Credito, updatedFormData];
    setCredito(newCredito);
    localStorage.setItem('credito', JSON.stringify(newCredito));

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
      const nombreCompleto = `${usuario.primerNombre} ${usuario.segundoNombre} ${usuario.primerApellido} ${usuario.segundoApellido}`;
      setNombreCompleto(nombreCompleto);
      setFormData((prevData) => ({
        ...prevData,
        nomCompleto: nombreCompleto,
        id: identificacion,
      }));
    } else {
      setNombreCompleto('Usuario no encontrado');
    }
  };

  return (
    <div className='formulario'>
      <h2>Formulario Creación de Crédito</h2>
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
            Crear Crédito
          </button>
        </div>
        <div className="input-group">
          <button type="button" onClick={handleConsultar}>
            Consultar Usuario
          </button>
        </div>
      </form>
      <div className='table'>
      <h2>Creditos Creados</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>Identificación</th>
              <th>Monto Del Credito</th>
              <th>Plazo De Las Cuotas</th>
              <th>Fecha de Solicitud</th>
            </tr>
            </thead>
            <tbody>
              {Credito.map((creditos, index) => (
                <tr key={index}>
                  <td>{creditos.nomCompleto}</td>
                  <td>{creditos.id}</td>
                  <td>{creditos.montoCredito}</td>
                  <td>{creditos.plazoCuotas}</td>
                  <td>{creditos.fechaSolicitud}</td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default Creditos;

