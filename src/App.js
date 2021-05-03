import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import SignIn from "./component/auth/SignIn";
import SignUp from "./component/auth/SignUp";
import Classroom from "./component/classroom/Classroom";
import Home from "./component/home/Home";
import Navbar from "./component/layout/Navbar";
import { AuthContext } from "./context/authContext";
import { auth } from "./shared/firebase";
import { getOnlyUserProfile } from "./services/userServices";
import Dashboard from "./component/classroom/dashboard/Dashboard";
import SetUpQuiz from "./component/classroom/SetUpQuiz";
import AuthRoute from "./routes/AuthRoute";
import SelfLearning from "./component/SelfLearning/selfLearning";
import Quiz from "./component/quiz/Quiz";
import FinalizeQuiz from "./component/FinalizeQuiz/FinalizeQuiz";
import Loading from "./component/layout/Loading";
import { ErrorAlert, InfoAlert } from './component/layout/Alert'

class App extends React.Component {
  state = {
    currentUser: {
      uid: "",
    },
    // loading:true,
    setCurrentUser: this.setCurrentUser.bind(this),
    errorMessage:'',
    successMessage:'',
    // errorCloseHandler: this.errorCloseHandler.bind(this),
    // successCloseHandler: this.errorCloseHandler.bind(this),
    errorOpenHandler: this.errorOpenHandler.bind(this),
    successOpenHandler: this.successOpenHandler.bind(this),
  };

  componentDidUpdate(prevState){
    if(this.state.currentUser.uid && prevState.uid !== this.state.currentUser.uid){
      sessionStorage.setItem('userInfo', JSON.stringify(this.state.currentUser))
    }
  }

  componentDidMount() {
    console.log("on refresh");
    const storedUserInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    console.log(sessionStorage.getItem('userInfo'))
    console.log(storedUserInfo)
    try {
      if(storedUserInfo && storedUserInfo.uid){
        console.log('reached in if block of app cdm')
        this.setState({...this.state, currentUser: storedUserInfo, loading:false})
      } else {
        getOnlyUserProfile().then((userData) => {
          console.log(userData);
          this.setState({ ...this.state, currentUser: userData, loading:false });
        })
        .catch(err => {
          // this.state.errorOpenHandler('Please Log In')
        })
      }
      // this.setState({ ...this.state, loading: false });
    } catch (err) {
      this.state.errorOpenHandler('Something went wrong. Please restart the application.')
      // window.location.href = 'signin/'
    }
  }

  setCurrentUser(currentUser) {
    console.log("currentUser state updated");
    this.setState({ ...this.state, currentUser });
  }

  errorCloseHandler(){
    console.log('ok')
    this.setState({...this.state, errorMessage:''})
  }

  successCloseHandler(){
    console.log('ok')
    this.setState({...this.state, successMessage:''})
  }

  errorOpenHandler(message){
    console.log('ok')
    this.setState({...this.state, errorMessage:message})
  }

  successOpenHandler(message){
    console.log('ok')
    this.setState({...this.state, successMessage:message})
  }

  render() {
    console.log(this.state);
    return (
      <AuthContext.Provider value={this.state}>
        {
          <BrowserRouter>
            <div className="App">
              {this.state.errorMessage && <ErrorAlert message={this.state.errorMessage} onOkClick={this.errorCloseHandler.bind(this)} />}
              {this.state.successMessage && <InfoAlert message={this.state.successMessage} onOkClick={this.successCloseHandler.bind(this)} />}
              <Navbar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/signin" component={SignIn} />
                <AuthRoute path="/signup" component={SignUp} />
                <Route path="/classroom" component={Classroom} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/set-up-quiz" component={SetUpQuiz} />
                <Route path="/selflearn" component={SelfLearning} />
                <Route path="/quiz" component={Quiz} />
                <Route path="/finalizequiz" component={FinalizeQuiz} />
              </Switch>
            </div>
          </BrowserRouter>
        }
      </AuthContext.Provider>
    );
  }
}

export default App;
