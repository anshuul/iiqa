import React from 'react'
import './index.css'
import ClassLayoutContainer from '../../layout/ClassLayoutContainer'
import JoinIcon from '../../../assets/join.png'
import CreateIcon from '../../../assets/create-white.png'

const Wrapper = (props) => (
    <ClassLayoutContainer {...props} emphasize={true}>
        <div className='customWrapper blue lighten-1'>
            {props.children}
        </div>
    </ClassLayoutContainer>
)

export function CreateTile(props) {
    return (
        <Wrapper {...props}>
            <img alt='create' src={CreateIcon}/>
            <p>Create a New Class</p>
        </Wrapper>
    )
}

export function JoinTile(props) {
    return (
        <Wrapper {...props}>
            <img alt='join' src={JoinIcon}/>
            <p>Join a Class</p>
        </Wrapper>
    )
}