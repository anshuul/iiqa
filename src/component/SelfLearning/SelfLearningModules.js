import React from "react";
import ModuleImage from "../../assets/dp.svg";

const SelfLearningModules = (props) => {
  console.log("redered quiz modules");
  const colors = ["red", "blue", "orange", "green"];
  const randomize = () => {
    return colors[Math.floor(Math.random() * 4)];
  };

  const defaultClassName = "card lighten-2";
  const finalClassName = `${defaultClassName} ${randomize()}`;

  return (
    <div
      className={finalClassName}
      style={{ width: "250px", marginLeft: "20px", height: "120px" }}
      onClick={() => props.onSelect()}
    >
      <div className="card-content white-text">
        <span
          className="card-title left"
          style={{ width: "55%", fontSize: 18 }}
        >
          {props.name}
        </span>
        <div
          className="imageclass right"
          style={{
            backgroundColor: "white",
            height: "70px",
            width: "70px",
            borderRadius: "50px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={props.displayPicture}
            style={{ height: "45px", width: "45px", margin: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SelfLearningModules;
