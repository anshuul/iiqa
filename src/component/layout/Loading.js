import React, { Component } from 'react'
import './Loading.css'
import ModalWrapper from '../layout/ModalWrapper'

export default class Loading extends Component {
    render() {
        return (
            <ModalWrapper>
                <div className='loaderContent' >
                    <div className="preloader-wrapper small active">
                        <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                        </div>
                    </div>
                    <p style={{marginTop:'10px'}}>{this.props.message}</p>
                </div>
            </ModalWrapper>
        )
    }
}
