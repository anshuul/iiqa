import React from 'react'
import './index.css'
import UploadIcon from '../../../assets/upload.png'

export default function index({onChangeHandler}) {
    return (
        <div className="fileInputContainer blue darken-3 z-depth-0">
            <input
                className='fileInput'
                type='file'
                id='file'
                onChange={onChangeHandler}
            />
            <label for="file" className='fileInputLabel'>
                <img alt='uploadFileIcon' src={UploadIcon} height='20px' width='20px'/>
                <p id='buttonLabel'>Choose a file</p>
            </label>
        </div>
    )
}
