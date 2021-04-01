import React from 'react'
import './index.css'

export default function index({children, ...rest}) {
    return (
        <div className='customContainer' {...rest}>
            {children}
        </div>
    )
}
