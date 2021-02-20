import React from "react";
import HomeImage from "../../assets/home.jpg";
import "./Home.css";

const Home = (props) => {
  const buttonHandler = () => {
    props.history.push("/signup");
  };
  return (
    <div className="container center-align" style={{ height: "auto" }}>
      <h2
      // style={{fontSize:'5vw', textAlign:'right'}}
      >
        Welcome to the new age of learning!!
      </h2>

      <center>
        <img src={HomeImage} alt="home image" height="70%" width="70%" />
      </center>
      <button
        onClick={buttonHandler}
        className="blue darken-2 btn-flat btn-large"
        style={{
          color: "white",
          borderRadius: "20px",
          marginTop: "2%",
          minWidth: "35%",
          fontSize: 20,
        }}
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;
