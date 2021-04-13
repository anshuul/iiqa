import React, { Component } from "react";
import SignInImage from "../../assets/login.svg";
import { Formik } from "formik";
import * as yup from "yup";
import "./SignUp.css";
import { signIn, signOut } from "../../services/userServices";
import { AuthContext } from "../../context/authContext";
import Loading from "../layout/Loading";
import ErrorText from "../layout/ErrorText";

import { getOnlyUserProfile } from "../../services/userServices";
import { getHeightForMainContainer } from "../../shared/utils.js";
import HomeBack from "../../assets/homeback2.svg";

class SignIn extends Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    signOut()
      .then(() => {
        console.log("signed out");
        this.props.setCurrentUser({ uid: "" });
      })
      .catch((err) => this.props.errorOpenHandler(err.message));
  }

  // componentDidUpdate(){ // caled when redirected to this page
  //   signOut()
  //   .then(()=>{
  //     console.log('signed out')
  //   })
  // }

  enableLoading() {
    this.setState({ loading: true });
  }

  disableLoading() {
    this.setState({ loading: false });
  }

  render() {
    const validationSchema = yup.object({
      email: yup
        .string()
        .required("Please enter your Email Id")
        .email("Invalid Email"),
      password: yup.string().required("Please enter your valid Password"),
    });

    return (
      <AuthContext.Consumer>
        {() => (
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
                <Loading message="Signing you in. Please wait. " />
              )}
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                  console.log("submitted");
                  console.log(values.email, values.password);
                  try {
                    this.enableLoading();
                    const uid = await signIn(values.email, values.password);
                    const userData = await getOnlyUserProfile(uid);
                    this.props.setCurrentUser({ ...userData });
                    this.props.history.push("classroom");
                  } catch (err) {
                    console.log(err.message);
                    this.props.errorOpenHandler(err.message)
                  } finally {
                    this.disableLoading();
                  }
                }}
              >
                {(props) => (
                  <div className="row customRow">
                    <div className="col s8 customLeftContainer">
                      {/*       <img
                        src={SignInImage}
                        alt="loginImage"
                        height="500px"
                        width="500px"
                      /> */}
                      <div className="headingLeftContainer">
                        <h1 className="black-text text-darken-4">
                          Sign In to enter a new world of Learning.
                        </h1>
                      </div>
                      <img alt='homeback' src={HomeBack} width="70%" height="70%" />
                    </div>

                    <div
                      className="col s4 customCol"
                      // style={{ dispaly: "flex", height: "100%", flexGrow: 2 }}
                    >
                      <div className="headingRightContainer">
                        <p className="black-text text-darken-4">Welcome Back</p>
                        <h6 className="grey-text text-lighten-1">
                          Please Login to continue!!
                        </h6>
                      </div>
                      <div className="input-field customInputField">
                        <label className="customLabel" htmlFor="email">
                          Email
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
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          {...props.getFieldProps("password")}
                          onKeyDown={(event) => event.key === 'Enter' && props.handleSubmit()}
                        />
                        {props.touched.password && props.errors.password && (
                          <ErrorText errorText={props.errors.password} />
                        )}
                      </div>
                      <div className="input-field customInputField">
                        <center>
                          <input
                            type="submit"
                            value="Login"
                            className="btn blue darken-3 z-depth-0 center-align customSubmitButton"
                            onClick={() => {
                              props.handleSubmit();
                            }}
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
        )}
      </AuthContext.Consumer>
    );
  }
}

export default function ComponentWithContext(props) {
  return (
    <AuthContext.Consumer>
      {({ currentUser, setCurrentUser, errorOpenHandler, successOpenHandler }) => (
        <SignIn
          {...props}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          errorOpenHandler={errorOpenHandler}
          successOpenHandler={successOpenHandler}
        />
      )}
    </AuthContext.Consumer>
  );
}
