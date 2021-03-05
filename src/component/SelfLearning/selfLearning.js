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

class SelfLearning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predefinedImageSets: [],
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
        this.setState({ ...this.state, predefinedImageSets });
      })
      .catch((err) => {
        console.log(err);
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
      .catch((err) => console.log(err))
      .finally(() => {
        this.setState({ ...this.state, loading: false });
      });
  }

  render() {
    return (
      <div className="container">
        {this.state.loading && <Loading message={this.state.loadingMessage} />}
        <h4 className="center">
          Please select any modules you want to learn from
          <div className="modules">
            {this.state.predefinedImageSets.map((module) => {
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
        </h4>
      </div>
    );
  }
}

export default SelfLearning;
