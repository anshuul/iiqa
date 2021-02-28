import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { getOnlyUserProfile } from "../../services/userServices";

const SignedInLinks = () => {
  const [initials, setInitials] = useState("");
  const [isSelfLearningDisplayed, setIsSelfLearningDisplayed] = useState(false);

  return (
    <AuthContext.Consumer>
      {({ currentUser }) => {
        getOnlyUserProfile(currentUser.uid)
          .then((userData) => {
            const { fname, lname } = userData;
            setInitials(
              `${fname.charAt(0).toUpperCase()}${lname.charAt(0).toUpperCase()}`
            );
            setIsSelfLearningDisplayed(userData.isStudent);
          })
          .catch((err) => console.log(err));
        return (
          <ul className="right">
            <li>
              <NavLink to="/signin">Log Out</NavLink>
            </li>
            {isSelfLearningDisplayed && (
              <li>
                <NavLink to="/selflearn">Self Learning</NavLink>
              </li>
            )}
            <li>
              <div className="btn btn-floating blue lighten-1">{initials}</div>
            </li>
          </ul>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default SignedInLinks;
