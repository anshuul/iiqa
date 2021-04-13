import React from "react";
import ModuleImage from "../../assets/dp.svg";
import Avatar from '../layout/Avatar'

const SelfLearningModules = (props) => {
  console.log("redered quiz modules");
  const colors = ["red", "blue", "orange", "green"];
  const randomize = () => {
    return colors[Math.floor(Math.random() * 4)];
  };

  const defaultClassName = "card lighten-2 selfLearningModuleContainer";
  const finalClassName = `${defaultClassName} ${randomize()}`;

  return (
    <div
      className={finalClassName}
      onClick={() => props.onSelect()}
    >
      <div className="card-content white-text selfLearningCardContent">
        <div className="selfLearningModuleImage">
          <Avatar displayPicture={props.displayPicture} className='selfLearningCustomAvatar' />
        </div>
        <span
          className="card-title selfLearningModuleTitle"
        >
          {props.name}
        </span>
      </div>
    </div>
  );
};

export default React.memo(SelfLearningModules);
