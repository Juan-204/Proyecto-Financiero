import React from 'react'
import './Clientes.css'

const Clientes = () => {
  return (
    <div className='formulario'>
        <h2>Formulario de Creación de Usuario</h2>
    <form action="#" method="post">
        <div class="input-group">
            <label for="nombre" id="primer_nombre">Primer Nombre:</label>
            <input type="text"  name="nombre" required/>
        </div>
        <div class="input-group">
            <label for="nombre">Segundo Nombre:</label>
            <input type="text" id="segundo_nombre" name="nombre"/>
        </div>
        <div class="input-group">
            <label for="apellido">Primer Apellido:</label>
            <input type="text" id="primer_apellido" name="apellido" required/>
        </div>
        <div class="input-group">
            <label for="apellido">Segundo Apellido:</label>
            <input type="text" id="segundo_apellido" name="apellido"/>
        </div>
        <div class="input-group">
            <label for="documento">Tipo De Documento</label>
            <select name="tipo_doc" required>
                <option value="">Seleccione un tipo de documento</option>
                <option value="DNI">Cedula de Ciudadania</option>
                <option value="LC">Cedula de Extranjeria</option>
            </select>
        </div>
        <div class="input-group">
            <label for="numeroDocu">Número de Documento:</label>
            <input type="number" id="numeroDocu" name="numeroDocu" required/>
        </div>
        <div class="input-group">
            <label for="fechaNac">Fecha de Nacimiento:</label>
            <input type="date" id="fechaNac" name="fechaNac" required/>
        </div>
        <div class="input-group">
            <label for="cel">Número de Celular:</label>
            <input type="number" id="cel" name="cel" required/>
        </div>
        <div class="input-group">
            <label for="tel">Número de Teléfono:</label>
            <input type="number" id="tel" name="tel" required/>
        </div>
        <div class="input-group">
            <label for="email">Correo Electrónico:</label>
            <input type="email" id="email" name="email" required/>
        </div>
        <div class="input-group">
            <label for="pais">Pais:</label>
            <input type="text" id="pais" name="pais" required/>
        </div>
        <div class="input-group">
            <label for="departamento">Departamento:</label>
            <input type="text" id="departamento" name="departamento" required/>
        </div>
        <div class="input-group">
            <label for="municipio">Municipio:</label>
            <input type="text" id="municipio" name="municipio" required/>
        </div>
        <div class="input-group">
            <label for="direccion">Dirección:</label>
            <input type="text" id="direccion" name="direccion" required/>
        </div>
        <div class="input-group">
            <button type="submit">Crear Usuario</button>
        </div>
    </form>
    </div>
  )
}

export default Clientes