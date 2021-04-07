import React, { Component } from "react";
import "./SignUp.css";
import SignUpImage from "../../assets/signup.svg";
import { Formik } from "formik";
import * as yup from "yup";

import {
  signUpForTeacher,
  signUpForStudent,
} from "../../services/userServices";
import { AuthContext } from "../../context/authContext";
import Loading from "../layout/Loading";
import ErrorText from "../layout/ErrorText";

import { getOnlyUserProfile } from "../../services/userServices";

import { getHeightForMainContainer } from "../../shared/utils.js";
import HomeBack from "../../assets/homeback.svg";

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      type: null,
      isTypeErrorDisplayed: false,
    };

    this.onTypeRadioChange = this.onTypeRadioChange.bind(this);
  }

  onTypeRadioChange(event) {
    this.setState({ ...this.state, type: event.target.value });
  }

  enableLoading() {
    this.setState({ loading: true });
  }

  disableLoading() {
    this.setState({ loading: false });
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const validationSchema = yup.object({
      fname: yup.string().required("First Name is required"),
      lname: yup.string().required("Last Name is required"),
      // type: yup.string().required('Please select one of the user types'),
      email: yup
        .string()
        .required("Email Id is required")
        .email("Invalid Email"),
      password: yup
        .string()
        .required("Please enter your Password of minimum 6 characters")
        .min(7, "Password must be more thant 6 character"),
      confirmPassword: yup
        .string()
        .required("Please Confirm your Password")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    });
    return (
      <div
        className="customMainContainer"
        style={{ height: getHeightForMainContainer(), width: "100%" }}
      >
        <div
          className="container custom"
          style={{
            height: "100%",
            // padding: "2.7% 0",
          }}
        >
          {this.state.loading && (
            <Loading message="Creating your Account. Please wait. " />
          )}
          <Formik
            initialValues={{
              fname: "",
              lname: "",
              type: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, action) => {
              try {
                if (this.state.type === null) {
                  this.setState({ ...this.state, isTypeErrorDisplayed: true });
                } else {
                  this.setState({ ...this.state, isTypeErrorDisplayed: false });
                  this.enableLoading();
                  let message = "";
                  let uid = null;
                  if (this.state.type === "1") {
                    // 1 for teacher temporary TODO: change to select value condition
                    uid = await signUpForTeacher(
                      values.email,
                      values.password,
                      capitalize(values.fname),
                      capitalize(values.lname)
                    );
                    message = "New Teacher Account created Succesfully";
                  } else {
                    uid = await signUpForStudent(
                      values.email,
                      values.password,
                      values.fname,
                      values.lname
                    );
                    message = "New Student Account created Succesfully";
                  }
                  const userData = await getOnlyUserProfile(uid);
                  this.props.setCurrentUser({ ...userData });
                  alert(message);
                  this.props.history.push("/classroom");
                }
              } catch (err) {
                alert(err.message);
              } finally {
                this.disableLoading();
              }
            }}
          >
            {(props) => (
              <div className="row customRow">
                <div className="col s8 customLeftContainer" style={{}}>
                  {/*                 <img
                  src={SignUpImage}
                  alt="SignUpImage"
                  height="500px"
                  width="500px"
                /> */}
                  {/* <img src={HomeBack} width="100%" height="100%" /> */}
                  <div className="headingLeftContainer">
                    <h1 className="black-text text-darken-4">
                      Join Us to enter a new world of Learning.
                    </h1>
                  </div>
                  <img
                    src={HomeBack}
                    className="customAuthImage"
                    width="70%"
                    height="70%"
                  />
                </div>
                <div className="col s4 customCol ">
                  <div className="headingRightContainer">
                    <p className="black-text text-darken-4">New Here?</p>
                    <h6 className="grey-text text-lighten-1">
                      Please Signup to join us!!
                    </h6>
                  </div>
                  <div className="input-field customInputField">
                    <label className="customLabel" htmlFor="firstname">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      {...props.getFieldProps("fname")}
                    />

                    {props.touched.fname && props.errors.fname && (
                      <ErrorText errorText={props.errors.fname} />
                    )}
                  </div>
                  <div className="input-field customInputField">
                    <label className="customLabel" htmlFor="lastname">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      {...props.getFieldProps("lname")}
                    />

                    {props.touched.lname && props.errors.lname && (
                      <ErrorText errorText={props.errors.lname} />
                    )}
                  </div>
                  <div
                    className="customInputField"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ marginRight: "10px" }}>
                      <label
                        className="customLabel"
                        style={{ fontSize: "1rem" }}
                      >
                        Are you a student or a teacher? *
                      </label>
                    </div>
                    <div style={{ marginRight: "10px" }}>
                      <label className="customLabel">
                        <input
                          className="with-gap"
                          value={1}
                          name="group1"
                          type="radio"
                          onChange={this.onTypeRadioChange}
                        />
                        <span>Teacher</span>
                      </label>
                    </div>
                    <div style={{ marginRight: "10px" }}>
                      <label className="customLabel">
                        <input
                          className="with-gap"
                          value={0}
                          name="group1"
                          type="radio"
                          onChange={this.onTypeRadioChange}
                        />
                        <span>Student</span>
                      </label>
                    </div>
                    {this.state.isTypeErrorDisplayed && (
                      <p style={{ fontSize: "12px" }}>
                        <ErrorText errorText="Please select user type" />
                      </p>
                    )}
                  </div>
                  {/*<div className="input-field customInputField">
            <label className='customLabel' htmlFor="usertype">Are you a student or a teacher? *</label>
            <input
              type="text"
              id="usertype"
              {...props.getFieldProps('type')}
            />
            
            {props.touched.type && props.errors.type && 
            <ErrorText errorText={props.errors.type} />}
            </div>*/}
                  <div className="input-field customInputField">
                    <label className="customLabel" htmlFor="email">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...props.getFieldProps("email")}
                    />

                    {props.touched.email && props.errors.email && (
                      <ErrorText errorText={props.errors.email} />
                    )}
                  </div>
                  <div className="input-field customInputField">
                    <label className="customLabel" htmlFor="password">
                      Password *
                    </label>
                    <input
                      type="password"
                      id="password"
                      {...props.getFieldProps("password")}
                    />

                    {props.touched.password && props.errors.password && (
                      <ErrorText errorText={props.errors.password} />
                    )}
                  </div>
                  <div className="input-field customInputField">
                    <label className="customLabel" htmlFor="confirmpassword">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      id="confirmpassword"
                      {...props.getFieldProps("confirmPassword")}
                    />

                    {props.touched.confirmPassword &&
                      props.errors.confirmPassword && (
                        <ErrorText errorText={props.errors.confirmPassword} />
                      )}
                  </div>
                  <div className="input-field customInputField">
                    <center>
                      <input
                        type="submit"
                        value="Register"
                        className="btn blue darken-3 z-depth-0 customSubmitButton"
                        onClick={props.handleSubmit}
                        style={{ borderRadius: "10px" }}
                      />
                    </center>
                  </div>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default function ComponentWithContext(props) {
  return (
    <AuthContext.Consumer>
      {({ currentUser, setCurrentUser }) => (
        <SignUp
          {...props}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}
    </AuthContext.Consumer>
  );
}
