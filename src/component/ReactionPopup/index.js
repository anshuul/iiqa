import React from 'react'
import './index.css'
import ModalWrapper from '../layout/ModalWrapper'
import HappyGif from '../../assets/happy.gif'
import SadGif from '../../assets/sad.gif'
import Move1 from '../../assets/move-1.gif'
import Move2 from '../../assets/move-2.gif'
import Move3 from '../../assets/move-3.gif'
import Move4 from '../../assets/move-4.gif'

const MOVE_GIF_ARRAY = [Move1, Move2, Move3, Move4]

function getRandomMoveGifs() {
    return <img src={MOVE_GIF_ARRAY[Math.floor(Math.random() * MOVE_GIF_ARRAY.length)]} alt='move'/>;
}

function PopupWrapper({children, message, makeAnimated}){
    let popupClassName = 'popupContent'

    return (
        <ModalWrapper>
            <div className={`popupContent ${makeAnimated && 'animated'}`}>
                {children}
                <p className='popupTitle' >{message}</p>
            </div>
        </ModalWrapper>
    )
}

export const HappyPopup = ({message}) =>{
    return (
        <PopupWrapper message={message} makeAnimated>
            <img src={HappyGif} alt='happy'/>
        </PopupWrapper>
    )
}

export const SadPopup = ({message}) =>{
    return (
        <PopupWrapper message={message} makeAnimated>
            <img src={SadGif} alt='sad' />
        </PopupWrapper>
    )
}

export const MoveToNextQuestionPopup = ({message}) => {
    return (
        <PopupWrapper message={message}>
            {getRandomMoveGifs()}
        </PopupWrapper>
    )
}