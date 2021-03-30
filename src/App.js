import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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

class App extends React.Component {
  state = {
    currentUser: {
      uid:''
    },
    setCurrentUser: this.setCurrentUser.bind(this),
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentUser.uid !== prevState.currentUser.uid) {
      localStorage.setItem("currentUserId", this.state.currentUser.uid);
      // if(this.state.currentUser.uid) {
      //   const userData = await getOnlyUserProfile(this.state.currentUser.uid)
      //   this.setState({...this.state, currentUser:userData})
      // }
    }
  }

  componentDidMount() {
    const currentUserUid = localStorage.getItem("currentUserId")
    if(currentUserUid) {
      getOnlyUserProfile(currentUserUid)
      .then(userData => this.setState({...this.state, currentUser:userData}))
    }
  }

  setCurrentUser(currentUser) {
    console.log('currentUser state updated')
    this.setState({ ...this.state, currentUser });
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signin" component={SignIn} />
              <AuthRoute path="/signup" component={SignUp} />
              <Route path="/classroom" component={Classroom} />
              <Route path="/dashboard" component={Dashboard} />
              <Route
                path="/set-up-quiz"
                component={SetUpQuiz}
              />
              <Route path="/selflearn" component={SelfLearning} />
              <Route path="/quiz" component={Quiz} />
              <Route path="/finalizequiz" component={FinalizeQuiz} />
            </Switch>
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }
}

export default App;
