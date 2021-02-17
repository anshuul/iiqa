import React, { Component } from 'react'
import './Loading.css'

export default class Loading extends Component {
    render() {
        return (
            <div className='loaderContainer' >
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
                    <p>{this.props.message}</p>
                </div>
            </div>
        )
    }
}
