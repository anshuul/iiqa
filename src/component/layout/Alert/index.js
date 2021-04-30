import React from 'react'
import './index.css'

import ModalWrapper from '../ModalWrapper'
import { SubmitButton } from '../Button'

import ErrorIcon from '../../../assets/error-icon.png'
import InfoIcon from '../../../assets/info-icon.svg'

const AlertWrapper = ({children, okClickHandler}) => (
    <ModalWrapper>
        <form 
            className='alertFormContainer' 
            onSubmit={okClickHandler}
            onKeyDown={(e) => e.key === 'Enter' && okClickHandler()}
        >
            <div className='alertContentContainer' >
                {children}
            </div>
            <div className='alertButtonContainer'>
                <SubmitButton>OK</SubmitButton>
            </div>
        </form>
    </ModalWrapper>
)

export const ErrorAlert = ({message, onOkClick:okClickHandler}) => (
    <AlertWrapper okClickHandler={okClickHandler}>
        <img alt='error' className='alertImageContainer' src={ErrorIcon} />
        <p>{message}</p>
    </AlertWrapper>
)

export const InfoAlert = ({message, onOkClick:okClickHandler}) => (
    <AlertWrapper okClickHandler={okClickHandler}>
        <img alt='info' className='alertImageContainer' src={InfoIcon} width='48px'/>
        <p>{message}</p>
    </AlertWrapper>
)