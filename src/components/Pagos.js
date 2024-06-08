import React, { useEffect } from 'react';
import './Clientes.css'

const PaymentForm = () => {
  useEffect(() => {
    const paymentTypeInputs = document.getElementsByName('paymentType');
    const amountDueSection = document.getElementById('amountDueSection');
    const totalPaymentSection = document.getElementById('totalPaymentSection');
    const abonoSection = document.getElementById('abonoSection');

    const handlePaymentTypeChange = (event) => {
      const value = event.target.value;
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

    paymentTypeInputs.forEach((input) => {
      input.addEventListener('change', handlePaymentTypeChange);
    });

    return () => {
      paymentTypeInputs.forEach((input) => {
        input.removeEventListener('change', handlePaymentTypeChange);
      });
    };
  }, []);

  return (
    <div className='formulario'>
      <h2>Formulario de Pagos</h2>
      <form id="formulario" action="#" method="post">
        <div className="input-group">
          <label htmlFor="documento">Número de Documento:</label>
          <input type="text" id="documento" required />
        </div>
        <div className="input-group">
          <label htmlFor="nombre">Nombre Completo:</label>
          <input type="text" id="nombre" required />
        </div>
        <div className="input-group">
          <label htmlFor="credito">Número de Crédito:</label>
          <input type="number" id="credito" name="credito" required />
        </div>
        <fieldset>
          <legend>Tipo de Pago:</legend>
          <label>
            <input type="radio" name="paymentType" value="cuota" defaultChecked /> Cuota
          </label>
          <div id="amountDueSection">
            <label htmlFor="amountDue">Monto a Pagar:</label>
            <input type="text" id="amountDue" name="amountDue" value="5000" readOnly />
          </div>
          <label>
            <input type="radio" name="paymentType" value="total" /> Total a Pagar
          </label>
          <div id="totalPaymentSection" style={{ display: 'none' }}>
            <label htmlFor="totalPayment">Total del Crédito:</label>
            <input type="text" id="totalPayment" name="totalPayment" value="20000" readOnly />
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
          <button type="submit">Crear Crédito</button>
        </div>
        <div className="input-group">
          <button id="consultar-credito-btn">Consultar Crédito</button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
