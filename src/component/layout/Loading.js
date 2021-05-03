import React, { Component } from 'react'
import './Loading.css'
import ModalWrapper from '../layout/ModalWrapper'
import Loader from '../../assets/loader.svg'
import Loader1 from '../../assets/loader.gif'
import Loader2 from '../../assets/loader2.gif'
import Loader3 from '../../assets/loader3.svg'
import Loader4 from '../../assets/loader4.svg'

export default class Loading extends Component {
    render() {
        return (
            <ModalWrapper>
                <div className='loaderContent' >
                    <div style={{display:'flex', flex:1, justifyContent:'center', width:'100%'}} >
                        <img alt='loader' id='loader' src={Loader3} width='70px' />
                        <img alt='loader' id='loader' src={Loader} width='70px' />
                        <img alt='loader' id='loader' src={Loader4} width='70px' />
                    </div>
                    <p className='loaderTitle'>{this.props.message}</p>
                </div>
            </ModalWrapper>
        )
    }
}
