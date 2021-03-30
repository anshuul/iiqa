import React from "react";
import ModuleImage from "../../assets/dp.svg";
import Avatar from '../layout/Avatar'

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
      style={{ width: "250px", marginLeft: "20px", height: "120px", cursor:'pointer' }}
      onClick={() => props.onSelect()}
    >
      <div className="card-content white-text">
        <span
          className="card-title left"
          style={{ width: "55%", fontSize: 18 }}
        >
          {props.name}
        </span>
        <Avatar displayPicture={props.displayPicture} />
        
      </div>
    </div>
  );
};

export default React.memo(SelfLearningModules);
