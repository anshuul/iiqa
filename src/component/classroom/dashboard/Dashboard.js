import React, { Component } from "react";
import StudentDetails from "./StudentDetails";
import Activities from "./Activities";
import "./Dashboard.css";
import Avatar from "../../../assets/dp.svg";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard container">
        <div className="row">
          <div
            className="col s12 m12 teal lighten-2"
            style={{
              border: "1px solid grey",
              marginTop: "20px",
              height: "200px",
              borderRadius: "15px",
              boxShadow: "10px 10px 10px #d3d3d3",
            }}
          >
            <div className="content">
              <div className="left">
                <div className="classroom">
                  <p
                    style={{
                      fontSize: "30px",
                      paddingTop: "20px",
                      paddingLeft: "10px",
                      color: "white",
                    }}
                  >
                    Dummy Class
                  </p>
                </div>

                <div className="teacherclass ">
                  <p
                    style={{
                      fontSize: "20px",
                      paddingTop: "10px",
                      paddingLeft: "10px",
                      color: "white",
                    }}
                  >
                    Teacher : Anshul Tated
                  </p>
                </div>
              </div>
              <div
                className="imageclass right"
                style={{
                  backgroundColor: "white",
                  height: "70px",
                  width: "70px",
                  borderRadius: "50px",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <img
                  src={Avatar}
                  alt=""
                  style={{ height: "45px", width: "45px", margin: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="col s12 m12"
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              height: "100px",
            }}
          >
            <button
              className="blue darken-2 btn-flat btn-large quiz-button"
              style={{
                color: "white",
                borderRadius: "20px",
                minWidth: "45%",
                fontSize: "20px",
                margin: "auto",
                padding: "0px",
              }}
            >
              Create Quiz
            </button>
          </div>
        </div>
        <div className="row">
          <div
            className="col s12 m8 "
            style={{
              border: "1px solid grey",
              marginTop: "20px",
              borderRadius: "15px",
              boxShadow: "10px 10px 10px #d3d3d3",
              height: "350px",
            }}
          >
            <div
              className="center activities"
              style={{
                paddingTop: "5px",
                overflowX: "hidden",
                overflowY: "auto",
                height: "300px",
              }}
            >
              <h5>Activities</h5>
              <Activities />
            </div>
          </div>
          <div
            className="col s12 m3 offset-m1"
            style={{
              border: "1px solid grey",
              marginTop: "20px",
              borderRadius: "15px",
              boxShadow: "10px 10px 10px #d3d3d3",
              height: "350px",
            }}
          >
            <h5 className="center">Student Names</h5>
            <p
              className="center student-details"
              style={{
                paddingTop: "5px",
                overflowX: "hidden",
                overflowY: "auto",
                height: "270px",
              }}
            >
              <StudentDetails />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
