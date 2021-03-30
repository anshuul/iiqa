import React from 'react'
import './index.css'

export default function index(props) {
    return (
        <div className={`displayPicture ${props.className}`} >
            <img src={props.displayPicture} alt='displayPicture' width='60px' height='60px'/>
        </div>
    )
}
