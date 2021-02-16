import React from "react";
import HomeImage from "../../assets/home.jpg";
import "./Home.css";

const Home = (props) => {
  const buttonHandler = () => {
    props.history.push("/signup");
  };
  return (
    <div className="container center-align">
      <h1>Welcome to the new age of learning!!</h1>

      <center>
        <img src={HomeImage} alt="home image" height="70%" width="70%" />
      </center>
      <button
        onClick={buttonHandler}
        className="blue darken-2 btn-flat btn-large"
        style={{
          color: "white",
          borderRadius: "20px",
          marginTop: "20px",
          width: "35%",
          fontSize: 20,
        }}
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;
