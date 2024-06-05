import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
        <Link to='/clientes' className='nav-link'>Clientes</Link>
        <Link to='/creditos' className='nav-link'>Creditos</Link>
        <Link to='/pagos' className='nav-link'>Pagos</Link>
    </div>
  )
}

export default Navbar