import React, { Component } from "react";
import SignUpImage from "../../assets/signup.svg";

class SignUp extends Component {
  state = {};

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
          <h3 className="black-text text-darken-4">New here?</h3>
          <h6 className="grey-text text-lighten-1">
            Please Signup to join us!!
          </h6>
          <div className="container">
            <center>
              <img
                src={SignUpImage}
                alt="login image"
                height="50%"
                width="50%"
              />
            </center>
          </div>
          <div className="input-field">
            <label htmlFor="firstname">First Name *</label>
            <input
              type="text"
              id="firstname"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="lastname">Last Name *</label>
            <input
              type="text"
              id="lastname"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="usertype">Are you a student or a teacher? *</label>
            <input
              type="text"
              id="usertype"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="confirmpassword">Confirm Password *</label>
            <input
              type="password"
              id="confirmpassword"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <center>
              <button className="btn blue darken-3 z-depth-0">Signup</button>
            </center>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
