import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Clientes.css';

const PaymentForm = () => {
  const location = useLocation();
  console.log('Location state:', location.state);
  const { numeroCredito, nomCompleto, identificacion, monto } = location.state || {};

  const [formData, setFormData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [documento, setDocumento] = useState(identificacion || '');
  const [nombre, setNombre] = useState(nomCompleto || '');
  const [numCredito, setNumCredito] = useState(numeroCredito || '');

  const handlePaymentTypeChange = (event) => {
    const value = event.target.value;
    const amountDueSection = document.getElementById('amountDueSection');
    const totalPaymentSection = document.getElementById('totalPaymentSection');
    const abonoSection = document.getElementById('abonoSection');

    if (value === 'cuota') {
      amountDueSection.style.display = 'block';
      totalPaymentSection.style.display = 'none';
      abonoSection.style.display = 'none';
    } else if (value === 'total') {
      amountDueSection.style.display = 'none';
      totalPaymentSection.style.display = 'block';
      abonoSection.style.display = 'none';
    } else if (value === 'abono') {
      amountDueSection.style.display = 'none';
      totalPaymentSection.style.display = 'none';
      abonoSection.style.display = 'block';
    }
  };

  useEffect(() => {
    const paymentTypeInputs = document.getElementsByName('paymentType');

    paymentTypeInputs.forEach((input) => {
      input.addEventListener('change', handlePaymentTypeChange);
    });

    return () => {
      paymentTypeInputs.forEach((input) => {
        input.removeEventListener('change', handlePaymentTypeChange);
      });
    };
  }, []);

  useEffect(() => {
    // Cargar datos del localStorage al montar el componente
    const storedFormData = JSON.parse(localStorage.getItem('formData')) || [];
    setFormData(storedFormData);

    // Restablecer el formulario al montar el componente
    document.getElementById('formulario').reset(); // Limpiar el formulario
    handlePaymentTypeChange({ target: { value: 'cuota' } }); // Restablecer las secciones a su estado inicial
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newFormData = {
      documento: documento,
      nombre: nombre,
      credito: document.getElementById('credito').value,
      fecha: document.getElementById('fecha').value,
      paymentType: document.querySelector('input[name="paymentType"]:checked').value,
    };
    if (newFormData.paymentType === 'abono') {
      newFormData.abonoAmount = document.getElementById('abonoAmount').value;
    }

    const updatedFormData = [...formData, newFormData];
    localStorage.setItem('formData', JSON.stringify(updatedFormData));
    alert('Pago exitoso');

    // Limpiar el formulario
    document.getElementById('formulario').reset();
    handlePaymentTypeChange({ target: { value: 'cuota' } });

    // Actualizar el estado con los nuevos datos del formulario
    setFormData(updatedFormData);
    setShowTable(true); // Mostrar la tabla de detalles del pago
  };
/*
  const handleDocumentoChange = (event) => {
    const newDocumento = event.target.value;
    setDocumento(newDocumento);

    // Buscar en el localStorage por la identificación proporcionada
    const storedUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const storedCredito = JSON.parse(localStorage.getItem('credito')) || [];
    const usuario = storedUsuarios.find((user) => user.numeroDocu === newDocumento);
    const credito = storedCredito.find((cred) => cred.id === newDocumento);

    if (usuario) {
      const nombreCompleto = `${usuario.primerNombre} ${usuario.segundoNombre} ${usuario.primerApellido} ${usuario.segundoApellido}`;
      setNombre(nombreCompleto);
    } else {
      setNombre('Usuario no encontrado');
    }

    if (credito) {
      const numberCredit = `${credito.numeroCredito}`;
      setNumCredito(numberCredit);
    } else {
      setNumCredito('0');
    }
  };
*/
  return (
    <div className='formulario'>
      <h2>Formulario de Pagos</h2>
      <form id="formulario" action="#" method="post" onSubmit={handleFormSubmit}>
        <div className="input-group">
          <label htmlFor="documento">Número de Documento:</label>
          <input type="text" id="documento" value={identificacion} /*onChange={handleDocumentoChange}*/ required />
        </div>
        <div className="input-group">
          <label htmlFor="nombre">Nombre Completo:</label>
          <input type="text" id="nombre" value={nomCompleto} readOnly  />
        </div>
        <div className="input-group">
          <label htmlFor="credito">Número de Crédito:</label>
          <input type="number" id="credito" value={numCredito} readOnly />
        </div>
        <fieldset>
          <legend>Tipo de Pago:</legend>
          <label>
            <input type="radio" name="paymentType" value="cuota" defaultChecked /> Cuota
          </label>
          <div id="amountDueSection">
            <label htmlFor="amountDue">Monto a pagar: </label>
            <input type="text" id="amountDue" name="amountDue" value="5000" readOnly />
          </div>
          <label>
            <input type="radio" name="paymentType" value="total" /> Total a Pagar
          </label>
          <div id="totalPaymentSection" style={{ display: 'none' }}>
            <label htmlFor="totalPayment">Total del Crédito:</label>
            <input type="text" id="totalPayment" name="totalPayment" value={monto} readOnly />
          </div>
          <label>
            <input type="radio" name="paymentType" value="abono" /> Abono
          </label>
          <div id="abonoSection" style={{ display: 'none' }}>
            <label htmlFor="abonoAmount">Monto a Abonar:</label>
            <input type="number" id="abonoAmount" name="abonoAmount" min="1" />
          </div>
        </fieldset>
        <div className="input-group">
          <label htmlFor="fecha">Fecha de Pago:</label>
          <input type="date" id="fecha" name="fecha" required />
        </div>
        <div className="input-group">
          <button type="submit">Generar Pago</button>
        </div>
        <div className="input-group">
          <button id="consultar-credito-btn" type="button" onClick={() => setShowTable(true)}>Generar Reporte</button>
        </div>

        {showTable && formData.length > 0 && (
          <div>
            <h2>Datos del Pago</h2>
            <table>
              <thead>
                <tr>
                  <th>Número de Documento</th>
                  <th>Nombre Completo</th>
                  <th>Número de Crédito</th>
                  <th>Tipo de Pago</th>
                  <th>Monto a Pagar / Abonar</th>
                  <th>Fecha de Pago</th>
                </tr>
              </thead>
              <tbody>
                {formData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.documento}</td>
                    <td>{data.nombre}</td>
                    <td>{data.credito}</td>
                    <td>{data.paymentType}</td>
                    <td>{data.paymentType === 'cuota' ? 5000 : data.paymentType === 'total' ? 20000 : data.abonoAmount}</td>
                    <td>{data.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
