import React, { Component } from 'react'
import './index.css'
import { decryptInformationAfterRouting } from '../../../services/classroomServices'
import { getImageSets } from '../../../services/quizServices'
import ImageStack from './ImageStack'
import Loading from '../../layout/Loading'

export default class index extends Component {

    constructor(props){
        super(props)
        this.state = {
            imageSets: [],
            imageSetImages: [],
            loading:false,
        }
        this.onSelectImageStHandler = this.onSelectImageStHandler.bind(this)
    }

    onSelectImageStHandler(id){
        const selectedImageSet = this.state.imageSets.find(imageSet => imageSet.docId === id)
        this.setState({...this.state, imageSetImages:selectedImageSet.imageLinks})
    }

    componentDidMount(){
        console.log(this.props.match.params)
        const { compoundedInfo } = this.props.match.params
        const [ogDocId, ogTeacherId] = decryptInformationAfterRouting(compoundedInfo)
        console.log(ogDocId, ogTeacherId)

        this.setState({...this.state, loading:true})
        getImageSets()
        .then(imageSets => {
            this.setState({...this.state, imageSets})
        })
        .catch(err => {
            alert(err.message)
        })
        .finally(()=>{
            this.setState({...this.state, loading:false})
        })
    }

    render() {
        // const imgSrc = 'https://firebasestorage.googleapis.com/v0/b/iiqa-dev.appspot.com/o/avatars%2Fdp2.svg?alt=media'
        const imgSrc = ''
        return (
            <div className='container customQuizMainContainer'>
                {this.state.loading && <Loading message='Getting Image Sets ready. Please wait.'/>}
                <h5>Choose Images to set up a Quiz...</h5>
                <div className='customQuizContainer'>
                    {/* Image sets container */}
                    <div className='customImageSetContainer' >
                        {/* list of image sets display */}
                        {this.state.imageSets.map(imageSet => (
                            <ImageStack key={imageSet.docId} onClick={()=>this.onSelectImageStHandler(imageSet.docId)} name={imageSet.name} src={imageSet.displayPicture} />
                        ))}
                    </div>
                    {/* main images view container */}
                    <div className='customImageViewContainer'>
                        {/* display container */}
                        <div className='customDisplayContainer'>
                            {this.state.imageSetImages.map(imageLink => (
                                <div className='customImageBlockContainer' key={imageLink} >
                                    <img src={imageLink} alt='ImageDisplayTile' width='200px' height='200px'className="customImage"/>
                                </div>
                            ))}
                        </div>
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
