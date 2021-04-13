import React, { Component } from "react";
import SelfLearningModules from "./SelfLearningModules";
import "./selfLearning.css";
import {
  getPredefinedImageSets,
  getQuizData,
  dummy,
} from "../../services/quizServices";
import Quiz from "../quiz/Quiz";
import Loading from "../layout/Loading";
import { AuthContext } from '../../context/authContext'

class SelfLearning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predefinedImageSets: {},
      loading: false,
      loadingMessage: "",
    };
    this.onSelectHandler = this.onSelectHandler.bind(this);
  }

  componentDidMount() {
    localStorage.removeItem("quizToken");
    window.speechSynthesis.cancel();
    this.setState({
      ...this.state,
      loading: true,
      loadingMessage: "Getting Quiz Modules. Please wait.",
    });
    getPredefinedImageSets()
      .then((predefinedImageSets) => {
        predefinedImageSets.sort((a, b) => a.name.localeCompare(b.name));
        this.setState({ ...this.state, predefinedImageSets:this.classifyImageSets(predefinedImageSets) });
      })
      .catch((err) => {
        console.log(err);
        this.props.errorOpenHandler('Could not fetch data. Check your internet connection.')
      })
      .finally(() => {
        this.setState({ ...this.state, loading: false });
      });
  }

  onSelectHandler(imageSet) {
    this.setState({
      ...this.state,
      loading: true,
      loadingMessage: "Getting your Quiz Ready. Please wait.",
    });
    getQuizData(imageSet.imageLinks)
      .then((data) => {
        console.log(data);
        this.props.history.push({
          pathname: "/quiz",
          state: { quizData: data.result },
        });
      })
      .catch((err) => {
        console.log(err)
        this.props.errorOpenHandler('Could not get Quiz for you. Kindly come again later.')
      })
      .finally(() => {
        this.setState({ ...this.state, loading: false });
      });
  }

  classifyImageSets(imageSets){
    let classifiedImageSet = {}
    for (const imageSet of imageSets){
      let imageSetType = ''
      if(imageSet.name.indexOf(' ') > -1){
        imageSetType = imageSet.name.trim().slice(0,imageSet.name.indexOf(' '))
      } else {
        imageSetType = imageSet.name.trim()
      }
      console.log(`#${imageSetType}#`)
      if(!classifiedImageSet.hasOwnProperty(imageSetType)) {
        if (imageSetType) classifiedImageSet[imageSetType] = []
      }
      imageSet.name = (imageSet.name.slice(imageSet.name.indexOf(' ')+1))
      console.log(imageSet.name)
      classifiedImageSet[imageSetType].push(imageSet)
    }
    return classifiedImageSet
  }

  render() {
    console.log(this.state.predefinedImageSets)
    return (
      <div className="container selfLearningContainer">
        {this.state.loading && <Loading message={this.state.loadingMessage} />}
        <h4 className="selfLearningContainerTitle">
          Please select any modules you want to learn from
        </h4>
        <p className='selfLearningContainerTitle grey-text text-lighten-1'>Click on any of the below modules to attempt respective Quiz.</p>
        {this.state.predefinedImageSets && Object.keys(this.state.predefinedImageSets).map(imageSetName => (
          <div className='selfLearningModuleCriteria'>
            <div className='selfLearningModuleCriteriaTitle' >
              <p>{imageSetName}</p>
            </div>
            <div className='selfLearningModuleCriteriaContent' >
              {this.state.predefinedImageSets[imageSetName].map((module) => {
                return (
                  <SelfLearningModules
                    name={module.name}
                    key={module.docId}
                    displayPicture={module.displayPicture || module.imageLinks[0]}
                    onSelect={() => this.onSelectHandler(module)}
                  />
                );
              })}
            </div>
          </div>    
            ))}
      </div>
    );
  }
}

export default function ComponentWithContext(props){
  return (
      <AuthContext.Consumer>
          {({ currentUser, setCurrentUser, errorOpenHandler, successOpenHandler }) => (
          <SelfLearning
              {...props}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              errorOpenHandler={errorOpenHandler}
              successOpenHandler={successOpenHandler}
          />
          )}
      </AuthContext.Consumer>
  )
}
