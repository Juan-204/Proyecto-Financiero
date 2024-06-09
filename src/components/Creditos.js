//import React, { useState } from 'react'
import './Clientes.css'
//import Clientes from './Clientes'

const Creditos = () => {
  return (
    <div className='formulario'>
      <h2>Formulario Creacion de Credito</h2>
      <form id="crear-credito-form">
        <div class="input-group"><label for="nombre">Nombre Completo:</label>
          <input type="text" id="nombre" required/>
        </div>
        <div class="input-group"><label for="identificacion">Identificación:</label>
          <input 
          type="text"
          id="identificacion"
          required/>
        </div>
        <div class="input-group"><label for="monto">Monto del Crédito:</label>
          <input type="number" id="monto" required/>
        </div>
        <div class="input-group">
        <label for="plazo">Plazo de Cuotas (Meses):</label>
        <select id="plazo" name="plazo" required>
          <option value="0">seleccione</option>
            <option value="12">12 Meses</option>
            <option value="24">24 Meses</option>
            <option value="36">36 Meses</option>
        </select>
        </div>
        <div class="input-group"><label for="fecha">Fecha de Solicitud:</label>
          <input type="date" id="fecha" required/>
        </div>
          <div class="input-group"><button type="submit">Crear Crédito</button>
        </div>
          <div class="input-group"><button id="consultar-credito-btn">Consultar Crédito</button>
        </div>
    </form>
    </div>
  )
}

export default Creditos