import React from 'react'
import './index.css'

export const CancelButton = ({onClick:cancelHandler, children:title}) => (
    <div className='waves-effect waves-red btn-flat cancelButton' onClick={()=>cancelHandler && cancelHandler()}>{title}</div>
)

export const SubmitButton = ({onClick:submitHandler, children:title}) => (
    <div className='btn blue darken-3 z-depth-0' onClick={()=>submitHandler && submitHandler()} >{title}</div>
)