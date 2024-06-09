import React, { useState } from 'react'
import './Clientes.css'

const Creditos = () => {
  
  const [identificacion, setIdentificacion] = useState('')
  const [nombreCompleto, setNombreCompleto] = useState('')
  
  const handleChangeIdentificacion = (e) => {
    const id = e.target.value
    setIdentificacion(id)
  }

  const handleConsultar = (e) => {
    e.preventDefault()
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    const usuario = usuarios.find((user) => user.numeroDocu === identificacion)

    if (usuario) {
      setNombreCompleto(`${usuario.primerNombre} ${usuario.segundoNombre} ${usuario.primerApellido} ${usuario.segundoApellido}`)
    } else {
      setNombreCompleto('usuario no encontrado')
    }
  }

  return (
    <div className='formulario'>
      <h2>Formulario Creacion de Credito</h2>
      <form id="crear-credito-form" onSubmit={handleConsultar}>
        <div className="input-group">
          <label htmlFor="nombre">Nombre Completo:</label>
          <input type="text" id="nombre" value={nombreCompleto} readOnly disabled/>
        </div>
        <div class="input-group">
          <label for="identificacion">
            Identificación:
          </label>
          <input 
          type="text"
          id="identificacion"
          value={identificacion}
          onChange={handleChangeIdentificacion}
          />
        </div>
        <div class="input-group">
          <label htmlFor="monto">
            Monto del Crédito:
          </label>
          <input type="number" id="monto" />
        </div>
        <div class="input-group">
        <label htmlFor="plazo">
          Plazo de Cuotas (Meses):
        </label>
        <select id="plazo" name="plazo" >
          <option value="0">seleccione</option>
            <option value="12">12 Meses</option>
            <option value="24">24 Meses</option>
            <option value="36">36 Meses</option>
        </select>
        </div>
        <div class="input-group">
          <label htmlFor="fecha">
            Fecha de Solicitud:
          </label>
          <input type="date" id="fecha" />
        </div>
          <div class="input-group">
            <button type="submit">
              Crear Crédito
            </button>
        </div>
          <div class="input-group">
            <button id="consultar-credito-btn">
              Consultar Crédito
            </button>
        </div>
    </form>
    </div>
  )
}

export default Creditos