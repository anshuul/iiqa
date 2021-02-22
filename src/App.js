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
import SetUpQuiz from './component/classroom/SetUpQuiz'

class App extends React.Component {
  state = {
    currentUser: {
      uid: localStorage.getItem("currentUserId"),
    },
    setCurrentUser: this.setCurrentUser.bind(this),
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentUser.uid !== prevState.currentUser.uid) {
      localStorage.setItem("currentUserId", this.state.currentUser.uid);
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user)
        this.setState({ ...this.state, currentUser: { uid: user.uid } });
      else this.setState({ ...this.state, currentUser: { uid: "" } });
    });
  }

  setCurrentUser(currentUser) {
    this.setState({ currentUser });
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
              <Route path="/signup" component={SignUp} />
              <Route path="/classroom" component={Classroom} />
              <Route path="/dashboard/:compoundedInfo" component={Dashboard} />
              <Route path='/set-up-quiz/:compoundedInfo' component={SetUpQuiz} />
            </Switch>
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }
}

export default App;
