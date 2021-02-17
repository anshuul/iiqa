import React, { Component } from "react";
import SignUpImage from "../../assets/signup.svg";
import { Formik } from 'formik'
import * as yup from 'yup'

import { signUpForTeacher, signUpForStudent } from '../../services/userServices'
import { AuthContext } from '../../context/authContext'

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
    const validationSchema = yup.object({
      fname: yup.string().required('First Name is required'),
      lname: yup.string().required('Last Name is required'),
      type: yup.string().required('Please select one of the user types'),
      email: yup.string().required('Email Id is required').email('Invalid Email'),
      password: yup.string().required().min(7, 'Password must be more thant 6 character'),
      confirmPassword: yup.string().required().oneOf([yup.ref('password'), null],'Passwords must match')
    })
    return (
      <div className="container">
        <Formik
          initialValues = {{fname: '', lname: '', type: '', email: '', password: '', confirmPassword: ''}}
          validationSchema={validationSchema}
          onSubmit={async (values, action)=>{
            try{
              let message = ''
              if(values.type === '1'){ // 1 for teacher temporary TODO: change to select value condition
                message = await signUpForTeacher(values.email, values.password, values.fname, values.lname)
              } else {
                message = await signUpForStudent(values.email, values.password, values.fname, values.lname)
              }
              alert(message)
            }catch(err){
              alert(err.message)
            }
          }}>
          {(props)=>(
        <div className="white">
          <h3 className="black-text text-darken-4">New here?</h3>
          <h6 className="grey-text text-lighten-1">
            Please Signup to join us!!
          </h6>
          <div className="container">
            <center>
              <img
                src={SignUpImage}
                alt="SignUpImage"
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
              {...props.getFieldProps('fname')}
            />
            
            {props.touched.fname && props.errors.fname && 
            <span className="helper-text" data-error="wrong" data-success="right">
              {props.errors.fname}
            </span>}
          </div>
          <div className="input-field">
            <label htmlFor="lastname">Last Name *</label>
            <input
              type="text"
              id="lastname"
              {...props.getFieldProps('lname')}
            />
            
            {props.touched.lname && props.errors.lname && 
            <span className="helper-text" data-error="wrong" data-success="right">
              {props.errors.lname}
            </span>}
          </div>
          <div className="input-field">
            <label htmlFor="usertype">Are you a student or a teacher? *</label>
            <input
              type="text"
              id="usertype"
              {...props.getFieldProps('type')}
            />
            
            {props.touched.type && props.errors.type && 
            <span className="helper-text" data-error="wrong" data-success="right">
              {props.errors.type}
            </span>}
          </div>
          <div className="input-field">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              {...props.getFieldProps('email')}
            />
            
            {props.touched.email && props.errors.email && 
            <span className="helper-text" data-error="wrong" data-success="right">
              {props.errors.email}
            </span>}
          </div>
          <div className="input-field">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              {...props.getFieldProps('password')}
            />
            
            {props.touched.password && props.errors.password && 
            <span className="helper-text" data-error="wrong" data-success="right">
              {props.errors.password}
            </span>}
          </div>
          <div className="input-field">
            <label htmlFor="confirmpassword">Confirm Password *</label>
            <input
              type="password"
              id="confirmpassword"
              {...props.getFieldProps('confirmPassword')}
            />
            
            {props.touched.confirmPassword && props.errors.confirmPassword && 
            <span className="helper-text" data-error="wrong" data-success="right">
              {props.errors.confirmPassword}
            </span>}
          </div>
          <div className="input-field">
            <center>
              <button className="btn blue darken-3 z-depth-0" onClick={props.handleSubmit}>Signup</button>
            </center>
          </div>
        </div>
        )}
        </Formik>
      </div>
    );
  }
}

export default SignUp;
