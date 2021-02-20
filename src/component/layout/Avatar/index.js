import React from 'react'
import './index.css'

export default function index(props) {
    return (
        <div className={`displayPicture ${props.className}`} >
            <img src={props.displayPicture} alt='displayPicture' style={{width:'100%', height:'100%'}}/>
        </div>
    )
}
