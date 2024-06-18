import React, { useState, useEffect } from 'react';
import './Clientes.css';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal.js'; // Importa el nuevo componente Modal

const Clientes = () => {
    const [formData, setFormData] = useState({
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        tipoDoc: '',
        numeroDocu: '',
        fechaNac: '',
        cel: '',
        tel: '',
        email: '',
        pais: '',
        departamento: '',
        municipio: '',
        direccion: '',
    });

    const [usuarios, setUsuarios] = useState([]); // Estado para almacenar la lista de usuarios
    const [editMode, setEditMode] = useState(false); // Estado para controlar el modo de edición
    const [editingUserId, setEditingUserId] = useState(null); // Estado para almacenar el ID del usuario en edición
    const [showCreateModal, setShowCreateModal] = useState(false); // Estado para mostrar el modal de creación
    const [showEditModal, setShowEditModal] = useState(false); // Estado para mostrar el modal de edición
    const [showTable, setShowTable] = useState(false); // Estado para mostrar la tabla de clientes

    const navigate = useNavigate(); // Hook de navegación de React Router DOM

    // Función para manejar el cambio en los campos de entrada
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Validación para campos específicos que solo permiten letras
        if (name === 'primerNombre' || name === 'segundoNombre' || name === 'primerApellido' || name === 'segundoApellido'
            || name === 'pais' || name === 'departamento' || name === 'municipio') {
            if (value === '' || /^[A-Za-z]+$/.test(value)) { // Validar que solo contenga letras
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value.toUpperCase(), // Convertir a mayúsculas
                }));
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    // Función para validar que el formulario esté completo
    const isFormValid = () => {
        for (let key in formData) {
            if (formData[key] === '' && key !== 'segundoNombre' && key !== 'segundoApellido') {
                return false;
            }
        }
        return true;
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid()) {
            alert("Por favor, complete todos los campos requeridos.");
            return;
        }

        if (editMode) {
            handleSaveChanges(); // Guardar cambios si está en modo de edición
        } else {
            if (!isTipoDocUnique(formData.numeroDocu)) {
                alert("Ya existe un cliente con el mismo documento.");
                resetFormData(); // Resetear los datos del formulario
                return;
            }
            createNewCliente(); // Crear nuevo cliente si no está en modo de edición
        }
    };

    // Función para verificar que el número de documento sea único
    const isTipoDocUnique = (numeroDocu) => {
        return !usuarios.some((usuario) => usuario.numeroDocu === numeroDocu);
    };

    // Función para guardar los cambios realizados en la edición
    const handleSaveChanges = () => {
        if (!isFormValid()) {
            alert("Por favor, complete todos los campos requeridos.");
            return;
        }

        const updatedUsuarios = usuarios.map((usuario) =>
            usuario.numeroDocu === editingUserId ? { ...formData, numeroDocu: editingUserId } : usuario
        );
        setUsuarios(updatedUsuarios);
        localStorage.setItem('usuarios', JSON.stringify(updatedUsuarios));

        setShowEditModal(true); // Mostrar modal de éxito
        setEditMode(false); // Salir del modo de edición
        setEditingUserId(null); // Limpiar el ID de usuario en edición
        resetFormData(); // Resetear los datos del formulario
    };

    // Función para crear un nuevo cliente
    const createNewCliente = () => {
        const newUsuarios = [...usuarios, formData];
        setUsuarios(newUsuarios);
        localStorage.setItem('usuarios', JSON.stringify(newUsuarios));

        setShowCreateModal(true); // Mostrar modal de éxito
        setShowTable(true); // Mostrar la tabla después de crear un cliente
        resetFormData(); // Resetear los datos del formulario
    };

    // Función para cancelar la edición o creación
    const handleCancel = () => {
        resetFormData(); // Resetear los datos del formulario
        setEditMode(false); // Salir del modo de edición
    };

    // Función para resetear los datos del formulario
    const resetFormData = () => {
        setFormData({
            primerNombre: '',
            segundoNombre: '',
            primerApellido: '',
            segundoApellido: '',
            tipoDoc: '',
            numeroDocu: '',
            fechaNac: '',
            cel: '',
            tel: '',
            email: '',
            pais: '',
            departamento: '',
            municipio: '',
            direccion: '',
        });
    };

    // Funciones para manejar eventos del modal de creación
    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
    };

    const handleConfirmCreateModal = () => {
        setShowCreateModal(false);
        navigate('/Creditos'); // Navegar a la ruta '/Creditos' después de confirmar
    };

    // Funciones para manejar eventos del modal de edición
    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleConfirmEditModal = () => {
        setShowEditModal(false);
        navigate('/Creditos'); // Navegar a la ruta '/Creditos' después de confirmar
    };

    // Función para manejar la edición de un usuario
    const handleEditar = (userId) => {
        const usuario = usuarios.find((user) => user.numeroDocu === userId);
        if (usuario) {
            setFormData(usuario); // Llenar el formulario con los datos del usuario seleccionado
            setEditingUserId(userId); // Establecer el ID del usuario en edición
            setEditMode(true); // Activar el modo de edición
        }
    };

    // Función para mostrar la tabla al generar un reporte
    const handleGenerateReport = () => {
        setShowTable(true); // Mostrar la tabla al generar el reporte
    };

    // Función para ocultar la tabla después de revisar el reporte
    const handleReviewReport = () => {
        setShowTable(false); // Ocultar la tabla después de revisar el reporte
    };

    // Función para eliminar un usuario
    const handleEliminar = (userId) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
            const updatedUsuarios = usuarios.filter((usuario) => usuario.numeroDocu !== userId);
            setUsuarios(updatedUsuarios);
            localStorage.setItem('usuarios', JSON.stringify(updatedUsuarios));
        }
    };

    // Efecto para cargar usuarios desde localStorage al cargar el componente
    useEffect(() => {
        const storedUsuarios = localStorage.getItem('usuarios');
        if (storedUsuarios) {
            setUsuarios(JSON.parse(storedUsuarios));
        }
    }, []);

    return (
        <div className='formulario'>
            <h2>Formulario de Creación de Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor='primerNombre'>Primer Nombre:</label>
                    <input
                        type="text"
                        id='primerNombre'
                        name="primerNombre"
                        value={formData.primerNombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="segundoNombre">Segundo Nombre:</label>
                    <input
                        type="text"
                        id="segundoNombre"
                        name="segundoNombre"
                        value={formData.segundoNombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="primerApellido">Primer Apellido:</label>
                    <input
                        type="text"
                        id='primerApellido'
                        name='primerApellido'
                        value={formData.primerApellido}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="segundoApellido">Segundo Apellido:</label>
                    <input
                        type="text"
                        id="segundoApellido"
                        name="segundoApellido"
                        value={formData.segundoApellido}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="tipoDoc">Tipo De Documento</label>
                    <select
                        name="tipoDoc"
                        value={formData.tipoDoc}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un tipo de documento</option>
                        <option value="DNI">Cedula de Ciudadania</option>
                        <option value="LC">Cedula de Extranjeria</option>
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="numeroDocu">Número de Document
                        o:</label>
                    <input
                        type="number"
                        id="numeroDocu"
                        name="numeroDocu"
                        value={formData.numeroDocu}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="fechaNac">Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        id="fechaNac"
                        name="fechaNac"
                        value={formData.fechaNac}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="cel">Número de Celular:</label>
                    <input
                        type="number"
                        id="cel"
                        name="cel"
                        value={formData.cel}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="tel">Número de Teléfono:</label>
                    <input
                        type="number"
                        id="tel"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="pais">Pais:</label>
                    <input
                        type="text"
                        id="pais"
                        name="pais"
                        value={formData.pais}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="departamento">Departamento:</label>
                    <input
                        type="text"
                        id="departamento"
                        name="departamento"
                        value={formData.departamento}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="municipio">Municipio:</label>
                    <input
                        type="text"
                        id="municipio"
                        name="municipio"
                        value={formData.municipio}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="direccion">Dirección:</label>
                    <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <button type="submit">{editMode ? 'Guardar Cambios' : 'Crear Cliente'}</button>
                    {editMode && <button type="button" onClick={handleCancel}>Cancelar Edición</button>}
                </div>
            </form>
            {/* Modal para la confirmación de creación */}
            <Modal
                show={showCreateModal}
                handleClose={handleCloseCreateModal}
                handleConfirm={handleConfirmCreateModal}
                title='Cliente Creado'
            >
                <p>El usuario ha sido creado con éxito. Paso a seguir: la creación del crédito.</p>
            </Modal>
            {/* Modal para la confirmación de edición */}
            <Modal
                show={showEditModal}
                handleClose={handleCloseEditModal}
                handleConfirm={handleConfirmEditModal}
                title='Cliente Editado'
            >
                <p>El usuario ha sido editado con éxito. ¿Desea continuar con la creación del crédito?</p>
            </Modal>
            {/* Mostrar la tabla de usuarios si showTable es true */}
            {showTable && (
                <div className='table'>
                    <h2>Usuarios Creados</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Primer Nombre</th>
                                <th>Segundo Nombre</th>
                                <th>Primer Apellido</th>
                                <th>Segundo Apellido</th>
                                <th>Tipo de Documento</th>
                                <th>Numero de Documento</th>
                                <th>Fecha de Nacimiento</th>
                                <th>Numero de Celular</th>
                                <th>Numero de Teléfono</th>
                                <th>Correo Electrónico</th>
                                <th>Pais</th>
                                <th>Departamento</th>
                                <th>Municipio</th>
                                <th>Dirección</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario, index) => (
                                <tr key={index}>
                                    <td>{usuario.primerNombre}</td>
                                    <td>{usuario.segundoNombre}</td>
                                    <td>{usuario.primerApellido}</td>
                                    <td>{usuario.segundoApellido}</td>
                                    <td>{usuario.tipoDoc}</td>
                                    <td>{usuario.numeroDocu}</td>
                                    <td>{usuario.fechaNac}</td>
                                    <td>{usuario.cel}</td>
                                    <td>{usuario.tel}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.pais}</td>
                                    <td>{usuario.departamento}</td>
                                    <td>{usuario.municipio}</td>
                                    <td>{usuario.direccion}</td>
                                    <td>
                                        <button onClick={() => handleEditar(usuario.numeroDocu)}>Editar</button>
                                        <button onClick={() => handleEliminar(usuario.numeroDocu)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="input-group">
                        <button onClick={handleReviewReport}>Reporte Revisado</button>
                    </div>
                </div>
            )}
            {/* Mostrar botón para generar reporte si showTable es false */}
            {!showTable && (
                <div className="input-group">
                    <button onClick={handleGenerateReport}>Generar Reporte</button>
                </div>
            )}
        </div>
    );
}

export default Clientes;
