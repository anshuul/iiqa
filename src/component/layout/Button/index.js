import React from 'react'
import './index.css'

export const CancelButton = ({onClick:cancelHandler, children:title}) => (
    <div className='waves-effect waves-red btn-flat cancelButton' onClick={()=>cancelHandler && cancelHandler()}>{title}</div>
)

export const SubmitButton = ({children:title}) => (
    <input type='submit' value={title} className='btn blue darken-3 z-depth-0 submitInputButton' />
)