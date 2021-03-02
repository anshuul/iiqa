import React, { Component } from "react";
import "./index.css";
import {
  decryptInformationAfterRouting,
  getClassroomData,
} from "../../../services/classroomServices";
import {
  createNewQuiz,
  dummy,
  getPromiseForFetchingImageSet,
  createImageSetForClassroom,
  getQuizData,
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
  }

  fillImagesToBeDisplayed(selectedImageSet) {
    const { imageSetImages } = this.state;
    selectedImageSet.imageLinks.forEach((imageLink) => {
      !imageSetImages.includes(imageLink) && imageSetImages.unshift(imageLink);
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

  onCrosshandler(link) {
    const { imageSetImages } = this.state;
    const filteredImages = imageSetImages.filter(
      (imageLink) => imageLink !== link
    );
    this.setState({ ...this.state, imageSetImages: filteredImages });
  }

  createQuiz() {
    !this.state.loading &&
      this.setState({
        ...this.state,
        loading: true,
        loadingMessage: "Creating your Quiz.",
      });
    getQuizData(this.state.imageSetImages)
      .then((data) => {
        console.log(data.result);
        return createNewQuiz(data.result, this.state.currentClassroomDocId);
      })
      .then((quizDocId) => {
        console.log("quiz created on ", quizDocId);
        alert("Quiz created");
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        this.setState({ ...this.state, loading: false });
      });
  }

  setUpQuizHandler() {
    // this.setState({ ...this.state, loading: true });
    if (this.state.imageSetImages.length === 0)
      alert("Please elect some image first");
    else {
      if (this.state.isCollectionToBeSaved) {
        !this.state.loading &&
          this.setState({
            ...this.state,
            loading: true,
            loadingMessage:
              "Saving your collection first. and then Creating quiz.",
          });
        console.log(this.state.currentClassroomDocId);
        createImageSetForClassroom(
          this.state.currentClassroomDocId,
          this.state.imageSetImages
        )
          .then((message) => {
            console.log(message);
            this.createQuiz();
          })
          .catch((err) => {
            alert(err.message);
            //   this.setState({ ...this.state, loading: false });
          })
          .finally(() => {
            // this.setState({ ...this.state, loading: false });
          });
      } else {
        this.createQuiz();
      }
    }
  }

  checkBoxChangeHandler(event) {
    console.log(event.target.checked);
    this.setState({
      ...this.state,
      isCollectionToBeSaved: event.target.checked,
    });
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
              {this.state.imageSetImages.map((imageLink, index) => (
                <div className="customImageBlockContainer" key={index}>
                  <div
                    className="cancelIcon"
                    onClick={() => this.onCrosshandler(imageLink)}
                  >
                    X
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${imageLink})`,
                      backgroundSize: "200px",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </div>
              ))}
            </div>
            {/* buton container */}
            <div className="customButtonContainer">
              <p>
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
                Set Up Quiz
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
