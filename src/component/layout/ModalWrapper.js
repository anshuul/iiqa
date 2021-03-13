import React from 'react'
import './ModalWrapper.css'

export default function ModalWrapper({children}) {
    return (
        <div className='boxContainer' >
            {children}
        </div>
    )
}
