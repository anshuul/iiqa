import React from 'react'
import './index.css'

import ModalWrapper from '../ModalWrapper'
import { CancelButton, SubmitButton } from '../Button'

import ErrorIcon from '../../../assets/error-icon.png'
import InfoIcon from '../../../assets/info-icon.svg'

const AlertWrapper = ({children, okClickHandler, cancelClickHandler,  positiveButtonTitle=null, negativeButtonTitle=null}) => (
    <ModalWrapper>
        <form 
            className='alertFormContainer' 
            onSubmit={(e) => {e.preventDefault(); okClickHandler()}}
            onKeyDown={(e) => e.key === 'Enter' && okClickHandler()}
        >
            <div className='alertContentContainer' >
                {children}
            </div>
            <div className='alertButtonContainer'>
                {negativeButtonTitle && <CancelButton onClick={cancelClickHandler}>{negativeButtonTitle}</CancelButton>}
                {positiveButtonTitle && <SubmitButton>{positiveButtonTitle}</SubmitButton>}
            </div>
        </form>
    </ModalWrapper>
)

export const ErrorAlert = ({message, onOkClick:okClickHandler}) => (
    <AlertWrapper 
        okClickHandler={okClickHandler}
        positiveButtonTitle='OK'
    >
        <img alt='error' className='alertImageContainer' src={ErrorIcon} />
        <p>{message}</p>
    </AlertWrapper>
)

export const InfoAlert = ({message, onOkClick:okClickHandler}) => (
    <AlertWrapper 
        okClickHandler={okClickHandler}
        positiveButtonTitle='OK'
    >
        <img alt='info' className='alertImageContainer' src={InfoIcon} width='48px'/>
        <p>{message}</p>
    </AlertWrapper>
)

export const Confirm = ({message, onOkClick:okClickHandler, onCancelClick:cancelClickHandler}) => (
    <AlertWrapper
        okClickHandler={okClickHandler}
        cancelClickHandler={cancelClickHandler}
        positiveButtonTitle='YES'
        negativeButtonTitle='NO'
    >
        <img alt='info' className='alertImageContainer' src={InfoIcon} width='48px'/>
        <p>{message}</p>
    </AlertWrapper>
)