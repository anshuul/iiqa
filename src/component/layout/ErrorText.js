import React from 'react'

export default function ErrorText({errorText}) {
    return (
        <span className="helper-text" data-error="wrong" data-success="right">
            <p style={{color:'red'}}>{errorText}</p>
        </span>
    )
}
