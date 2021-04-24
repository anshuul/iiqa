import React from 'react'
import './index.css'

export default function index(props) {
    return (
        <div className={`displayPicture ${props.className}`} >
            {<img src={props.displayPicture} alt='displayPicture' width='97%' height='97%'/>}
        </div>
    )
}
