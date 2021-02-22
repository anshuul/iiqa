import React from 'react'
import './index.css'

export default function index({src, onClick, name}) {
    return (
        <div className='imageStackContainer' onClick={()=>onClick()}>
            <div className='imageStackDisplayPicture' >
                <img src={src} alt='ImageSetTile' width='100%' height='100%'/>
            </div>
            <p className='imageStackTitle'>{name}</p>
        </div>
    )
}
