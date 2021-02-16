import React, { Component } from "react";
import SignInImage from "../../assets/login.svg";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h3 className="black-text text-darken-4">Welcome Back!</h3>
          <h6 className="grey-text text-lighten-1">Please Login to continue</h6>
          <div className="container">
            <center>
              <img
                src={SignInImage}
                alt="login image"
                height="50%"
                width="50%"
              />
            </center>
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <center>
              <button className="btn blue darken-3 z-depth-0 center-align">
                Login
              </button>
            </center>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
