import React, { Component } from "react";
import "./index.css";
import {
  encryptInformationForRouting,
  decryptInformationAfterRouting,
  getClassroomData,
} from "../../../services/classroomServices";
import {
  createNewQuiz,
  dummy,
  getPromiseForFetchingImageSet,
  createImageSetForClassroom,
  getQuizData,
  uploadImagesToFirebaseStorage,
} from "../../../services/quizServices";
import ImageStack from "./ImageStack";
import Loading from "../../layout/Loading";
import FileInputButton from '../../layout/FileInputButton'
import { getHeightForMainContainer } from '../../../shared/utils'
import PlusIcon from '../../../assets/plus-black.svg'
import MinusIcon from '../../../assets/minus-black.png'

const ExpandIcon = () => (
  <img alt='expand' src={PlusIcon} className='customDropDownIcon' />
)

const CollapseIcon = () => (
  <img alt='collapse' src={MinusIcon} className='customDropDownIcon' />
)

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predefinedImageSets: [],
      classroomImageSets: [],
      imageSetImages: [],
      loading: false,
      loadingMessage: "",
      isCollectionToBeSaved: false,
      currentClassroomDocId: "",
      uploadedImages: {
        file:[],
        imagePreviewUrl:'',
      },
      generatedQuiz: [],
      isSavedBoxOpen:false,
      isPredfinedBoxOpen:true,
      imageContainersHeightValue:'95.5%',
    };
    this.onSelectPredefinedImageSetHandler = this.onSelectPredefinedImageSetHandler.bind(
      this
    );
    this.onSelectClassroomImageSetHandler = this.onSelectClassroomImageSetHandler.bind(
      this
    );
    this.onCrosshandler = this.onCrosshandler.bind(this);
    this.setUpQuizHandler = this.setUpQuizHandler.bind(this);
    this.checkBoxChangeHandler = this.checkBoxChangeHandler.bind(this);
    this.chooseFileChangeHandler = this.chooseFileChangeHandler.bind(this)
    this.onCrosshandlerForUploadedImages = this.onCrosshandlerForUploadedImages.bind(this)
    this.onCrosshandlerForGeneratedQuizImages = this.onCrosshandlerForGeneratedQuizImages.bind(this)
    this.uploadImages = this.uploadImages.bind(this)
    this.uploadQuiz = this.uploadQuiz.bind(this)
    this.uploadHandler = this.uploadHandler.bind(this)
    this.toggleSavedImageSetBox = this.toggleSavedImageSetBox.bind(this)
    this.togglePredefinedImageSetBox = this.togglePredefinedImageSetBox.bind(this)
  }

  fillImagesToBeDisplayed(selectedImageSet) {
    const { imageSetImages, generatedQuiz } = this.state;
    console.log('generatedQuiz from fill method',generatedQuiz)
    selectedImageSet.imageLinks.forEach((imageLink) => {
      if(!imageSetImages.includes(imageLink) && !generatedQuiz.find(quizObj => quizObj.image_path === imageLink))
        imageSetImages.unshift(imageLink);
    });
    this.setState({ ...this.state, imageSetImages });
  }

  onSelectPredefinedImageSetHandler(id) {
    const selectedImageSet = this.state.predefinedImageSets.find(
      (imageSet) => imageSet.docId === id
    );
    this.fillImagesToBeDisplayed(selectedImageSet);
  }

  onSelectClassroomImageSetHandler(id) {
    const selectedImageSet = this.state.classroomImageSets.find(
      (imageSet) => imageSet.docId === id
    );
    this.fillImagesToBeDisplayed(selectedImageSet);
  }

  onCrosshandler(indexParam) {
    const { imageSetImages } = this.state;
    const filteredImages = imageSetImages.filter(
      (_, index) => index !== indexParam
    );
    this.setState({ ...this.state, imageSetImages: filteredImages });
  }

  uploadHandler(){
    console.log(this.state.isCollectionToBeSaved)
    if (this.state.isCollectionToBeSaved) {
      console.log('if block')
      !this.state.loading?
        this.setState({
          ...this.state,
          loading: true,
          loadingMessage:
            "Saving your collection first.",
        }) : this.setState({...this.state, loadingMessage:"Saving your collection first.",})
      console.log(this.state.currentClassroomDocId);
      console.log(this.state.generatedQuiz.map(quizObj => quizObj.image_path))
      createImageSetForClassroom(
          this.state.currentClassroomDocId,
          this.state.generatedQuiz.map(quizObj => quizObj.image_path)
        )
      .then((message) => {
        console.log(message);
        this.uploadQuiz()
      })
      .catch((err) => {
        alert('Please select some images.')
        console.error(err)
          this.setState({ ...this.state, loading: false });
      })
      .finally(() => {
        // this.setState({ ...this.state, loading: false });
      });
    } else {
      console.log('if block')
      this.uploadQuiz()
    }
  }

  uploadQuiz(){
    if(this.state.generatedQuiz.length > 0){
      this.setState({...this.state, loading:true, loadingMessage:'Uploading your Quiz'})
      createNewQuiz(this.state.generatedQuiz, this.state.currentClassroomDocId)
      .then((quizDocId) => {
        console.log("quiz created on ", quizDocId);
        alert("Quiz created");
        this.props.history.push({
          pathname:'/finalizequiz',
          state: {
            classroomDocId: this.props.location.state.classroomDocId,
            quizDocId
          }
        });
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        this.setState({ ...this.state, loading: false });
      });
    } else {
      alert('Please generate a quiz first.')
    }
  }

  generateQuiz(uploadedFilesURLs) {
    !this.state.loading ?
      this.setState({
        ...this.state,
        loading: true,
        loadingMessage: "Creating your Quiz.",
      }) : this.setState({...this.state, loadingMessage: "Creating your Quiz.",})
      console.log(uploadedFilesURLs)
      getQuizData([...this.state.imageSetImages, ...uploadedFilesURLs])
      .then(({result}) => {
        console.log(result);
        this.setState({
                        ...this.state,
                        generatedQuiz: [...this.state.generatedQuiz, ...result],
                        imageSetImages:[],
                        uploadedImages: {
                          file:[],
                          imagePreviewUrl:'',
                        },
                      })
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        this.setState({ ...this.state, loading: false });
        console.log('generatedQuiz',this.state.generatedQuiz)
      });
  }

  uploadImages(){
    uploadImagesToFirebaseStorage(this.state.uploadedImages.file)
    .then(fileNamesArr => {
      console.log(fileNamesArr)
    })
    .catch(err => {
      console.error(err)
    })
  }

  setUpQuizHandler() {
    // this.setState({ ...this.state, loading: true });
    if (this.state.imageSetImages.length === 0 && this.state.uploadedImages.file.length === 0)
      alert("Please select some image first");
    else {
      this.setState({...this.state, loading:true, loadingMessage:'Uploading your Chosen Images'})
      uploadImagesToFirebaseStorage(this.state.uploadedImages.file)
      .then(uploadedFilesURLs => {
        console.log(uploadedFilesURLs)
        this.generateQuiz(uploadedFilesURLs);
      })
    }
  }

  checkBoxChangeHandler(event) {
    console.log(event.target.checked);
    this.setState({
      ...this.state,
      isCollectionToBeSaved: event.target.checked,
    });
  }

  chooseFileChangeHandler(event) {
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        ...this.state,
        uploadedImages: {
          file: [...this.state.uploadedImages.file, file],
          imagePreviewUrl: [...this.state.uploadedImages.imagePreviewUrl, reader.result] 
        }
      });
      console.log(file)
    }

    reader.readAsDataURL(file)
  }

  onCrosshandlerForUploadedImages(index){
    let files = this.state.uploadedImages.file
    let imageURLs = this.state.uploadedImages.imagePreviewUrl

    this.setState({
      ...this.state,
      uploadedImages:{
        file: files.filter((file, fileIndex) => fileIndex !== index),
        imagePreviewUrl: imageURLs.filter((url, urlIndex) => urlIndex !== index)
      }
    })
  }

  onCrosshandlerForGeneratedQuizImages(indexParam){
    let { generatedQuiz } = this.state
    generatedQuiz = generatedQuiz.filter((_, index) => index !== indexParam)
    this.setState({...this.state, generatedQuiz})
  }

  getHeightOfContainers(isSavedBoxOpen=false, isPredfinedBoxOpen=false){
    // const { isSavedBoxOpen, isPredfinedBoxOpen } = this.state
    console.log(isSavedBoxOpen, isPredfinedBoxOpen)
    if(isSavedBoxOpen && isPredfinedBoxOpen){
      return '50%'
    } else if(!isSavedBoxOpen && !isPredfinedBoxOpen){
      return ''
    } 
    return '95.5%'
  }

  toggleSavedImageSetBox(){
    let { isSavedBoxOpen, isPredfinedBoxOpen } = this.state
    isSavedBoxOpen = !isSavedBoxOpen
    const imageContainersHeightValue = this.getHeightOfContainers(isSavedBoxOpen, isPredfinedBoxOpen)
    this.setState({...this.state, isSavedBoxOpen, imageContainersHeightValue})
  }

  togglePredefinedImageSetBox(){
    let { isSavedBoxOpen, isPredfinedBoxOpen } = this.state
    isPredfinedBoxOpen = !isPredfinedBoxOpen
    const imageContainersHeightValue = this.getHeightOfContainers(isSavedBoxOpen, isPredfinedBoxOpen)
    this.setState({...this.state, isPredfinedBoxOpen, imageContainersHeightValue})
  }

  componentDidMount() {
    const { classroomDocId } = this.props.location.state

    let predefinedImageSetsState = [],
      classroomImageSetsState = [];

    this.setState({
      ...this.state,
      currentClassroomDocId: classroomDocId,
      loading: true,
      loadingMessage: "Getting Image Sets ready. Please wait.",
    });
    getPromiseForFetchingImageSet(classroomDocId)
      .then(([predefinedImageSets, classroomImageSets]) => {
        console.log(predefinedImageSets);
        console.log(classroomImageSets);
        predefinedImageSets.sort((a, b) => a.name.localeCompare(b.name));
        classroomImageSets.sort((a, b) => b.name.localeCompare(a.name));
        predefinedImageSetsState = predefinedImageSets;
        classroomImageSetsState = classroomImageSets;
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      })
      .finally(() => {
        this.setState({
          ...this.state,
          predefinedImageSets: predefinedImageSetsState,
          classroomImageSets: classroomImageSetsState,
          loading: false,
        });
      });
  }

  render() {
    // const imgSrc = 'https://firebasestorage.googleapis.com/v0/b/iiqa-dev.appspot.com/o/avatars%2Fdp2.svg?alt=media'
    // const imgSrc = ''
    return (
      <div className="container customQuizMainContainer" style={{height:getHeightForMainContainer()}}>
        {this.state.loading && <Loading message={this.state.loadingMessage} />}
        <h5>Choose Images to set up a Quiz...</h5>
        <p className='grey-text text-lighten-1' >Choose images from the given collections, generate quiz and upload it.</p>
        <div className="customQuizContainer">
          {/* Image sets container */}
          <div className='customImageMenuContainer' >
            <div className="customImageSetContainer" id='predefined' style={{height:this.state.imageContainersHeightValue}}>
              <div className="customImageSetContainerTitle grey lighten-4" onClick={this.togglePredefinedImageSetBox}>
                <p>Ready - made</p>
                {this.state.isPredfinedBoxOpen ? <CollapseIcon/> : <ExpandIcon/>}
              </div>
              {this.state.isPredfinedBoxOpen && <div className="customImageSetWrapper">
                {/* list of image sets display */}
                {this.state.predefinedImageSets.map((imageSet) => (
                  <ImageStack
                    key={imageSet.docId}
                    onClick={() =>
                      this.onSelectPredefinedImageSetHandler(imageSet.docId)
                    }
                    name={imageSet.name}
                    src={imageSet.displayPicture || imageSet.imageLinks[0]}
                  />
                ))}
              </div>}
            </div>
            <div className="customImageSetContainer" id='saved' style={{height:this.state.imageContainersHeightValue}}>
              <div className="customImageSetContainerTitle grey lighten-4" onClick={this.toggleSavedImageSetBox}>
                <p>Stored</p>
                {this.state.isSavedBoxOpen ? <CollapseIcon/> : <ExpandIcon/>}
              </div>
              {this.state.isSavedBoxOpen && <div className="customImageSetWrapper">
                {/* list of image sets display */}
                {this.state.classroomImageSets.map((imageSet) => (
                  <ImageStack
                    key={imageSet.docId}
                    onClick={() =>
                      this.onSelectClassroomImageSetHandler(imageSet.docId)
                    }
                    name={imageSet.name}
                    src={imageSet.displayPicture || imageSet.imageLinks[0]}
                  />
                ))}
              </div>}
            </div>
          </div>
          {/* main images view container */}
          <div className="customImageViewContainer">
            {/* options container */}
            <div className='customOptionsContainer' >
              <div className='customOptionsWrapper' >
                <FileInputButton onChangeHandler={this.chooseFileChangeHandler} />
              </div>
            </div>
            {/* display container */}
            <div className="customDisplayContainer">
              {this.state.generatedQuiz && this.state.generatedQuiz.map(({image_path, question, answer}, index) => (
                <div className="customImageBlockContainer" key={index}
                  style={{
                    backgroundImage: `url(${image_path})`,
                  }}
                >
                  <div
                    className="cancelIcon"
                    onClick={() => this.onCrosshandlerForGeneratedQuizImages(index)}
                  >
                    X
                  </div>
                  <div className='customGeneratedQuizBlock' >
                    <p className="customTextClass center">{question}</p>

                    <p className="customTextClass center">
                      <strong>Correct Answer: </strong> {answer.correct_answer}
                    </p>
                    <p className="customTextClass center">
                      <strong>Options: </strong>
                      {answer.options.map(option => (`${option}, `))}
                    </p>
                  </div>
                </div>
              ))}
              {this.state.imageSetImages.map((imageLink, index) => (
                <div className="customImageBlockContainer" key={index}
                  style={{
                    backgroundImage: `url(${imageLink})`,
                  }}
                >
                  <div
                    className="cancelIcon"
                    onClick={() => this.onCrosshandler(index)}
                  >
                    X
                  </div>
                  
                </div>
              ))}
              {[...this.state.uploadedImages.imagePreviewUrl].map((imageURL, index) => (
                <div className="customImageBlockContainer" key={index}
                  style={{
                    backgroundImage: `url(${imageURL})`,
                  }}
                >
                  <div
                    className="cancelIcon"
                    onClick={() => this.onCrosshandlerForUploadedImages(index)}
                  >
                    X
                  </div>
                </div>
              ))}
            </div>
            {/* buton container */}
            <div className="customButtonContainer">
              {/*<FileInputButton onChangeHandler={this.chooseFileChangeHandler} />*/}
              <div className='customButtonWrapper'>
              <p className='customQuizButton'>
                <label>
                  <input
                    type="checkbox"
                    checked={this.state.isCollectionToBeSaved}
                    onChange={this.checkBoxChangeHandler}
                  />
                  <span>Save this collection</span>
                </label>
              </p>
              <div
                className="btn blue darken-3 z-depth-0 customQuizButton"
                onClick={this.setUpQuizHandler}
              >
                Generate Quiz
              </div>
              <div
                className="btn blue darken-3 z-depth-0 customQuizButton"
                onClick={this.uploadHandler}
              >
                Upload Quiz
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
