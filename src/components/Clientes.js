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

    const [usuarios, setUsuarios] = useState([]);
    //const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null); // Nuevo estado para almacenar el ID del usuario en edición
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showTable, setShowTable] = useState(false); // Estado para mostrar la tabla de clientes


    
   
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const isFormValid = () => {
        for (let key in formData) {
            if (formData[key] === '' && key !== 'segundoNombre' && key !== 'segundoApellido') {
                return false;
            }
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid()) {
            alert("Por favor, complete todos los campos requeridos.");
            return;
        }
    
        if (editMode) {
            handleSaveChanges();
        } else {
            if (!isTipoDocUnique(formData.tipoDoc)) {
                alert("Ya existe un cliente con el mismo tipo de documento.");
                resetFormData(); // Resetear los datos del formulario
                return;
                
            }
            createNewCliente();
        }
    };
    
    const isTipoDocUnique = (tipoDoc) => {
        return !usuarios.some((usuario) => usuario.tipoDoc === tipoDoc);
    };

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
        setEditMode(false);
        setEditingUserId(null);
        resetFormData();
    };
    
    const createNewCliente = () => {
        const newUsuarios = [...usuarios, formData];
        setUsuarios(newUsuarios);
        localStorage.setItem('usuarios', JSON.stringify(newUsuarios));
    
        setShowCreateModal(true);
        setShowTable(true); // Mostrar la tabla después de crear un clien
        resetFormData();
    };

    const handleCancel = () => {
        resetFormData();
        setEditMode(false); // Asegurarse de salir del modo de edición si se cancela
    };

    
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
    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
    };

    const handleConfirmCreateModal = () => {
        setShowCreateModal(false);
        navigate('/Creditos');
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleConfirmEditModal = () => {
        setShowEditModal(false);
        navigate('/Creditos');
    };

    const handleEditar = (userId) => {
        const usuario = usuarios.find((user) => user.numeroDocu === userId);
        if (usuario) {
            setFormData(usuario);
            setEditingUserId(userId);
            setEditMode(true);
        }
        
    };

    



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
                    <label htmlFor="numeroDocu">Número de Documento:</label>
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
            <Modal
                show={showCreateModal}
                handleClose={handleCloseCreateModal}
                handleConfirm={handleConfirmCreateModal}
                title='Cliente Creado'
            >
                <p>El usuario ha sido creado con éxito. Paso a seguir: la creación del crédito.</p>
            </Modal>
            <Modal
                show={showEditModal}
                handleClose={handleCloseEditModal}
                handleConfirm={handleConfirmEditModal}
                title='Cliente Editado'
            >
                <p>El usuario ha sido editado con éxito. ¿Desea continuar con la creación del crédito?</p>
            </Modal>
            {showTable && ( // Mostrar la tabla solo si showTable es true
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
</td>
                </tr>
                ))}
                </tbody>
                </table>
         
                </div>
                )}
        </div>

    )
}



export default Clientes;