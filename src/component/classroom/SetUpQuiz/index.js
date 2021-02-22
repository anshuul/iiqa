import React, { Component } from 'react'
import './index.css'
import { decryptInformationAfterRouting } from '../../../services/classroomServices'
import ImageStack from './ImageStack'

export default class index extends Component {

    componentDidMount(){
        console.log(this.props.match.params)
        const { compoundedInfo } = this.props.match.params
        const [ogDocId, ogTeacherId] = decryptInformationAfterRouting(compoundedInfo)
        console.log(ogDocId, ogTeacherId)
    }

    render() {
        return (
            <div className='container customQuizMainContainer'>
                <h5>Choose Images to set up a Quiz...</h5>
                <div className='customQuizContainer'>
                    {/* Image sets container */}
                    <div className='customImageSetContainer' >
                        {/* list of image sets display */}
                        <ImageStack/>
                        <ImageStack/>
                        <ImageStack/>
                        <ImageStack/>
                        <ImageStack/>
                        <ImageStack/>
                        <ImageStack/>
                        <ImageStack/>
                        <ImageStack/>
                    </div>
                    {/* main images view container */}
                    <div className='customImageViewContainer'>
                        {/* display container */}
                        <div className='customDisplayContainer'></div>
                        {/* buton container */}
                        <div className='customButtonContainer' >
                            <div
                                className="btn blue darken-3 z-depth-0 customQuizButton"
                            >Set Up Quiz</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
