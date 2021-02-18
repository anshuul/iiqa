import "./App.css";
import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from "./component/auth/SignIn";
import SignUp from "./component/auth/SignUp";
import Classroom from './component/classroom'
import Home from "./component/home/Home";
import Navbar from "./component/layout/Navbar";
import { AuthContext } from './context/authContext'
import { auth } from './shared/firebase'
import { getUserProfile } from './services/userServices'

class App extends React.Component{
  state = {
    currentUser: '',
    setCurrentUser: this.setCurrentUser
  }

  componentDidMount(){
    auth.onAuthStateChanged(user => {
      if(user){
        getUserProfile(user.uid)
        .then(userData => {
          this.setState({...this.state, currentUser:userData})
        })
        .catch(err => {
          console.log(err)
        })
      } else { // when looged out user will be null
        this.setState({...this.state, currentUser:user}) // logout state
      }
    })
  }

  setCurrentUser(currentUser){
    this.setState({currentUser})
  }

  render(){
    return (
      <AuthContext.Provider value={this.state}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path='/classroom' component={Classroom}/>
            </Switch>
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }
}

export default App;
