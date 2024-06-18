import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Clientes.css';

const PaymentForm = () => {
  const location = useLocation();
  console.log('Location state:', location.state);
  const { numeroCredito, nomCompleto, identificacion, monto, totalCuotas, plazo } = location.state || {};

  const [formData, setFormData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [documento, setDocumento] = useState(identificacion || '');
  const [nombre, setNombre] = useState(nomCompleto || '');
  const [numCredito, setNumCredito] = useState(numeroCredito || '');
  const [numCuotas, setNumCuotas] = useState(plazo || 0);
  const [totalCredito, setTotalCredito] = useState(monto || 0);

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
    const storedFormData = JSON.parse(localStorage.getItem('formData')) || [];
    setFormData(storedFormData);
    document.getElementById('formulario').reset(); 
    handlePaymentTypeChange({ target: { value: 'cuota' } });
  }, []);

  const [currentCreditPayments, setCurrentCreditPayments] = useState([]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const paymentType = document.querySelector('input[name="paymentType"]:checked').value;
  
    let newTotalCredito = parseFloat(totalCredito);
    let newNumCuotas = numCuotas;
  
    if (paymentType === 'cuota') {
      newNumCuotas = numCuotas - 1;
      newTotalCredito = (newTotalCredito - parseFloat(totalCuotas)).toFixed(2);
    } else if (paymentType === 'total') {
      newTotalCredito = 0;
      newNumCuotas = 0;
    } else if (paymentType === 'abono') {
      const abonoAmount = parseFloat(document.getElementById('abonoAmount').value);
      const cuotaAmount = parseFloat(totalCuotas) / numCuotas;
      if (cuotaAmount <= abonoAmount) {
        newNumCuotas = numCuotas - 1;
      }
      newTotalCredito = (newTotalCredito - abonoAmount).toFixed(2);
    }
  
    const newFormData = {
      documento: documento,
      nombre: nombre,
      credito: numCredito,
      fecha: document.getElementById('fecha').value,
      paymentType: paymentType,
      numcuotas: newNumCuotas,
      toCredito: newTotalCredito,
    };
  
    if (paymentType === 'abono') {
      newFormData.abonoAmount = document.getElementById('abonoAmount').value;
    }
  
    const updatedFormData = [...formData, newFormData];
    localStorage.setItem('formData', JSON.stringify(updatedFormData));
    alert('Pago exitoso');
    document.getElementById('formulario').reset();
    handlePaymentTypeChange({ target: { value: 'cuota' } });
    setFormData(updatedFormData);
    setNumCuotas(newNumCuotas);
    setTotalCredito(newTotalCredito);
  
    // Filtrar y mostrar solo los pagos relacionados con el número de crédito actual
    const filteredPayments = updatedFormData.filter(item => item.credito === numCredito);
    setCurrentCreditPayments(filteredPayments);
    setShowTable(true);
  };
  
  const handleGenerateReport = () => {
    // Mostrar todos los pagos almacenados
    setShowTable(true);
    setCurrentCreditPayments(formData);
  };

  return (
    <div className='formulario'>
      <h2>Formulario de Pagos</h2>
      <form id="formulario" action="#" method="post" onSubmit={handleFormSubmit}>
        <div className="input-group">
          <label htmlFor="documento">Número de Documento:</label>
          <input type="text" id="documento" value={documento} readOnly required />
        </div>
        <div className="input-group">
          <label htmlFor="nombre">Nombre Completo:</label>
          <input type="text" id="nombre" value={nombre} readOnly />
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
            <label htmlFor="amountDue">Monto a pagar:</label>
            <input type="text" id="amountDue" name="amountDue" value={totalCuotas} readOnly />
          </div>
          <label>
            <input type="radio" name="paymentType" value="total" /> Total a Pagar
          </label>
          <div id="totalPaymentSection" style={{ display: 'none' }}>
            <label htmlFor="totalPayment">Total del Crédito:</label>
            <input type="text" id="totalPayment" name="totalPayment" value={totalCredito} readOnly />
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
          <button id="consultar-credito-btn" type="button" onClick={handleGenerateReport}>Generar Reporte</button>
        </div>

        {showTable && currentCreditPayments.length > 0 && (
    <div>
      <h2>Datos del Pago</h2>
      <table>
        <thead>
          <tr>
            <th>Número de Documento</th>
            <th>Nombre Completo</th>
            <th>Número de Crédito</th>
            <th>Monto Crédito</th>
            <th>Tipo de Pago</th>
            <th>Monto a Pagar / Abonar</th>
            <th>Numero De Cuotas</th>
            <th>Fecha de Pago</th>
          </tr>
        </thead>
        <tbody>
          {currentCreditPayments.map((data, index) => (
            <tr key={index}>
              <td>{data.documento}</td>
              <td>{data.nombre}</td>
              <td>{data.credito}</td>
              <td>{data.toCredito}</td>
              <td>{data.paymentType}</td>
              <td>{data.paymentType === 'cuota' ? totalCuotas : data.paymentType === 'total' ? totalCredito : data.abonoAmount}</td>
              <td>{data.numcuotas}</td>
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

