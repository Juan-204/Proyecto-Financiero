import React, { useEffect, useState } from 'react'; // Importación de React y funciones de estado y efecto
import Accordion from './Acordeon'; // Importación del componente de acordeón
import './Clientes.css'; // Importación de estilos CSS
import { useNavigate } from 'react-router-dom'; // Importación del hook de navegación de react-router-dom

const Creditos = () => {
  // Definición de componentes de estado
  const [identificacion, setIdentificacion] = useState(''); // Estado para la identificación
  const [nombreCompleto, setNombreCompleto] = useState(''); // Estado para el nombre completo
  const [Nombre, setNombre] = useState(''); // Estado para el nombre
  const [Credito, setCredito] = useState([]); // Estado para almacenar los créditos
  const [consultaId, setConsultaId] = useState(''); // Estado para la consulta por identificación
  const [creditosFiltrados, setCreditosFiltrados] = useState([]); // Estado para los créditos filtrados
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(false); // Estado para indicar si se encontró al usuario

  // Estado para almacenar el formulario de datos
  const [formData, setFormData] = useState({
    nomCompleto: '',
    id: '',
    montoCredito: '',
    plazoCuotas: '',
    fechaSolicitud: '',
  });

  const navigate = useNavigate(); // Función de navegación del hook useNavigate

  // Efecto para cargar los créditos almacenados en localStorage al cargar el componente
  useEffect(() => {
    const storedCreditos = localStorage.getItem('credito');
    if (storedCreditos) {
      setCredito(JSON.parse(storedCreditos));
    }
  }, []);

  // Función para calcular la cuota mensual del crédito
  const GenerarCuota = (montoCredito, plazoCuotas) => {
    montoCredito = parseInt(montoCredito); // Conversión del monto a entero
    plazoCuotas = parseInt(plazoCuotas); // Conversión del plazo a entero
    const cuota = (montoCredito * 0.3 + montoCredito) / plazoCuotas; // Cálculo de la cuota
    return cuota.toFixed(2); // Retorna la cuota con dos decimales
  };

  // Maneja cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Maneja el envío del formulario para crear un nuevo crédito
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos requeridos
    if (!formData.nomCompleto || !formData.id || !formData.montoCredito || !formData.plazoCuotas || !formData.fechaSolicitud) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Generación aleatoria de número y estado del crédito
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const numeroRand = Math.floor(Math.random() * 10000) + 1;
    const estado = randomNumber < 50 ? 'Denegado' : 'Aprobado';

    // Datos actualizados del formulario
    const updatedFormData = {
      ...formData,
      nomCompleto: nombreCompleto,
      id: identificacion,
      numeroRandom: randomNumber,
      estadoCredito: estado,
      numeroCredito: numeroRand,
      montoCuotas: GenerarCuota(formData.montoCredito, formData.plazoCuotas),
    };

    // Actualización de la lista de créditos y almacenamiento en localStorage
    const newCredito = [...Credito, updatedFormData];
    setCredito(newCredito);
    localStorage.setItem('credito', JSON.stringify(newCredito));

    // Reinicio de los campos del formulario y estado de nombre completo e identificación
    setFormData({
      nomCompleto: '',
      id: '',
      montoCredito: '',
      plazoCuotas: '',
      fechaSolicitud: '',
    });
    setNombreCompleto('');
    setIdentificacion('');

    // Alerta de éxito al crear el crédito
    alert('¡Crédito creado con éxito!');
  };

  // Maneja el cambio en el campo de identificación para consultar usuario
  const handleChangeIdentificacion = (e) => {
    const id = e.target.value;
    setIdentificacion(id);
  };

  // Función para consultar usuario por identificación
  const handleConsultar = (e) => {
    e.preventDefault();
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; // Obtención de usuarios almacenados
    const usuario = usuarios.find((user) => user.numeroDocu === identificacion); // Búsqueda de usuario por número de documento

    if (usuario) {
      // Si se encuentra el usuario, se actualizan los datos del formulario y estado
      const nombreCom = `${usuario.primerNombre} ${usuario.segundoNombre} ${usuario.primerApellido} ${usuario.segundoApellido}`;
      setNombreCompleto(nombreCom);
      setFormData((prevData) => ({
        ...prevData,
        nomCompleto: nombreCom,
        id: identificacion,
      }));
      setUsuarioEncontrado(true); // Usuario encontrado
    } else {
      setNombreCompleto('Usuario no encontrado');
      setUsuarioEncontrado(false); // Usuario no encontrado
    }
  };

  // Maneja el cambio en el campo de consulta por identificación
  const handleChangeConsultaId = (e) => {
    setConsultaId(e.target.value);
  };

  // Función para consultar crédito por identificación
  const handleConsultarCredito = (e) => {
    e.preventDefault();
    if (consultaId) {
      // Filtra los créditos por identificación consultada
      const credEncontrados = Credito.filter((credito) => credito.id === consultaId);
      setCreditosFiltrados(credEncontrados); // Actualiza el estado de créditos filtrados
    } else {
      setCreditosFiltrados([]); // Si no hay identificación, se reinicia la lista de créditos filtrados
    }
    document.getElementById('consultar-credito').reset(); // Reinicia el formulario de consulta
  };

  // Maneja la acción de pagar un crédito
  const handlePagar = (numeroCredito, id) => {
    const usuario = JSON.parse(localStorage.getItem('credito')) || [] // Obtención de créditos almacenados
    const uss = usuario.find((user) => user.numeroCredito === numeroCredito); // Búsqueda de usuario por número de crédito

    // Almacenamiento de datos del crédito en variables
    const nombre = `${uss.nomCompleto}`;
    const monto = `${uss.montoCredito}`
    const montoCuota = `${uss.montoCuotas}`
    const cantidadCuotas = `${uss.plazoCuotas}`
    setNombre(nombre) // Actualiza el estado de nombre
    navigate(`/pagos/${numeroCredito}`, { // Navegación a la ruta de pagos con los datos del crédito
      state: {
        numeroCredito: numeroCredito,
        nomCompleto: nombre,
        identificacion: id,
        monto: monto,
        totalCuotas: montoCuota,
        plazo: cantidadCuotas,
      },
    });
  };

  // Estructura JSX del componente
  return (
    <div className="formulario">
      {/* Componente de acordeón para crear crédito */}
      <Accordion title="Crear Crédito">
        <form id="crear-credito-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="nombre">Nombre Completo:</label>
            <input type="text" id="nombre" value={nombreCompleto} readOnly />
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
            <button type="button" onClick={handleConsultar}>
              Consultar Usuario
            </button>
          </div>
          {usuarioEncontrado && ( // Condición para mostrar campos adicionales si se encuentra el usuario
            <>
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
                <label htmlFor="cuota">Cuota:</label>
                <input
                  type="text"
                  id="cuota"
                  name="cuota"
                  value={GenerarCuota(formData.montoCredito, formData.plazoCuotas)}
                  readOnly
                />
              </div>
              <div className="input-group">
                <button type="submit">Crear Crédito</button>
              </div>
            </>
          )}
        </form>
      </Accordion>

      {/* Componente de acordeón para consultar crédito */}
      <Accordion title="Consultar Crédito">
        <form
          id="consultar-credito"
          action="#"
          method="post"
          onSubmit={handleConsultarCredito}
        >
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
            <button type="submit">Consultar Crédito</button>
          </div>
        </form>
        {/* Condición para mostrar la tabla de créditos filtrados */}
        {creditosFiltrados.length > 0 && (
          <div className="table">
            <h2>Creditos Creados</h2>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre Completo</th>
                  <th>Identificación</th>
                  <th>Monto Del Crédito</th>
                  <th>Plazo De Las Cuotas</th>
                  <th>Fecha de Solicitud</th>
                  <th>Puntaje</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {creditosFiltrados.map((credito, index) => (
                  <tr key={index}>
                    <td>{credito.numeroCredito}</td>
                    <td>{credito.nomCompleto}</td>
                    <td>{credito.id}</td>
                    <td>{credito.montoCredito}</td>
                    <td>{credito.plazoCuotas}</td>
                    <td>{credito.fechaSolicitud}</td>
                    <td>{credito.numeroRandom}</td>
                    <td>{credito.estadoCredito}</td>
                    <td>
                      {credito.estadoCredito === 'Aprobado' && ( // Condición para mostrar botón de pagar si el crédito está aprobado
                        <button onClick={() => handlePagar(credito.numeroCredito, credito.id)}>Pagar</button>
                      )}
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
