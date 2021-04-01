import React from 'react'
import './index.css'

export default function index({children}) {
    return (
        <div className='buttonGroup'>
            {children}
        </div>
    )
}
