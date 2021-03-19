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
      // TODO: make promise.all for this
      createImageSetForClassroom(
          this.state.currentClassroomDocId,
          this.state.generatedQuiz.map(quizObj => quizObj.image_path)
        )
      .then((message) => {
        console.log(message);
        this.uploadQuiz()
      })
      .catch((err) => {
        alert(err.message);
        console.error(err)
        //   this.setState({ ...this.state, loading: false });
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
        this.props.history.push(
          `/finalizequiz/${encryptInformationForRouting(
            this.state.currentClassroomDocId,
            quizDocId
          )}`
        );
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

  componentDidMount() {
    console.log(this.props.match.params);
    const { compoundedInfo } = this.props.match.params;
    const [ogDocId, ogTeacherId] = decryptInformationAfterRouting(
      compoundedInfo
    );
    console.log(ogDocId, ogTeacherId);

    let predefinedImageSetsState = [],
      classroomImageSetsState = [];

    this.setState({
      ...this.state,
      currentClassroomDocId: ogDocId,
      loading: true,
      loadingMessage: "Getting Image Sets ready. Please wait.",
    });
    getPromiseForFetchingImageSet(ogDocId)
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
      <div className="container customQuizMainContainer">
        {this.state.loading && <Loading message={this.state.loadingMessage} />}
        <h5>Choose Images to set up a Quiz...</h5>
        <div className="customQuizContainer">
          {/* Image sets container */}
          <div className="customImageSetContainer">
            <h6 className="customImageSetContainerTitle">Predefined</h6>
            <div className="customImageSetWrapper">
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
            </div>
          </div>
          <div className="customImageSetContainer">
            <h6 className="customImageSetContainerTitle">Saved</h6>
            <div className="customImageSetWrapper">
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
            </div>
          </div>
          {/* main images view container */}
          <div className="customImageViewContainer">
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
              <div className="btn blue darken-3 z-depth-0 customQuizButton">
                <input
                  ref='file'
                  type='file'
                  onChange={this.chooseFileChangeHandler}
                />
              </div>
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
    );
  }
}
