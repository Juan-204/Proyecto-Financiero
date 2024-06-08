import React from 'react'
import './Clientes.css'

const Pagos = () => {
  return (
      <div className='formulario'>
      <h2>Formulario de Pagos</h2>
    <form id="formulario" action="#" method="post">
        <div class="input-group">
            <label for="documento">Número de Documento:</label>
            <input type="text" id="documento" required/>
        </div>
        <div class="input-group">
            <label for="nombre">Nombre Completo:</label>
            <input type="text" id="nombre" required/>
        </div>
        <div class="input-group">
            <label for="credito">Número de Crédito:</label>
            <input type="number" id="credito" name="credito" required/>
        </div>
        <div class="input-group">
        <label for="amountDue">Monto a Pagar:</label>
        <input type="text" id="amountDue" name="amountDue" value="5000" readonly/>
        </div>
        <fieldset>
            <legend>Tipo de Pago:</legend>
            <label><input type="radio" name="paymentType" value="cuota" checked/> Cuota</label>
            <label><input type="radio" name="paymentType" value="total"/> Total a Pagar</label>
            <label><input type="radio" name="paymentType" value="abono"/> Abono</label>
        </fieldset>

        <div id="totalPaymentSection">
            <label for="totalPayment">Total del Crédito:</label>
            <input type="text" id="totalPayment" name="totalPayment" value="20000" readonly/>
        </div>

        <div id="abonoSection">
            <label for="abonoAmount">Monto a Abonar:</label>
            <input type="number" id="abonoAmount" name="abonoAmount" min="1"/>
        </div>
        <div class="input-group">
            <label for="fecha">Fecha de Pago:</label>
            <input type="date" id="fecha" name="fecha" required/>
        </div>
        <button type="submit" onclick="pago()">Realizar Pago</button>
        <button type="button" id="reporte">Generar Reporte</button>
        </form>
        </div>
  )
}

export default Pagos