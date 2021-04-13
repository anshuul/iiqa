import React from 'react'
import './index.css'

import ModalWrapper from '../ModalWrapper'
import { SubmitButton } from '../Button'

import ErrorIcon from '../../../assets/error-icon.png'
import InfoIcon from '../../../assets/info-icon.svg'

const AlertWrapper = ({children, okClickHandler}) => (
    <ModalWrapper>
        <div className='alertFormContainer' >
            <div className='alertContentContainer' >
                {children}
            </div>
            <div className='alertButtonContainer' >
                <SubmitButton onClick={okClickHandler}>OK</SubmitButton>
            </div>
        </div>
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