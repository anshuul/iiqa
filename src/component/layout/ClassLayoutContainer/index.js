import React from 'react'
import './index.css'

export default function index({children, emphasize, ...rest}) {
    let containerClassName = 'customContainer'
    if(emphasize){
        containerClassName += ' customContainerBoxed'
    }
    return (
        <div className={containerClassName} {...rest}>
            {children}
        </div>
    )
}
