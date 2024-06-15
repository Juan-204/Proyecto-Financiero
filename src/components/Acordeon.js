import React, { useState } from 'react'
import './Acordeon.css'


const Acordeon = ({title, children}) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleAcordion = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className='accordion'>
            <div className='accordion-header' onClick={toggleAcordion}>
                <h3>{title}</h3>
                <span>{isOpen ? '-' : '+' }</span>
            </div>
            {isOpen && <div className='accordion-contest'>{children}</div>}
        </div>
    )
}

export default Acordeon