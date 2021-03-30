import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { getOnlyUserProfile } from "../../services/userServices";

const SignedInLinks = () => {
  const [initials, setInitials] = useState("");
  const [isSelfLearningDisplayed, setIsSelfLearningDisplayed] = useState(false);

  const getInitials = (fname, lname) => `${fname.charAt(0).toUpperCase()}${lname.charAt(0).toUpperCase()}`

  return (
    <AuthContext.Consumer>
      {({ currentUser }) => {
        return (
          <ul className="right">
            <li>
              <NavLink to="/signin">Log Out</NavLink>
            </li>
            {currentUser.isStudent && (
              <li>
                <NavLink to="/selflearn">Self Learning</NavLink>
              </li>
            )}
            <li>
              <div className="btn btn-floating blue lighten-1">{getInitials(currentUser.fname, currentUser.lname)}</div>
            </li>
          </ul>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default SignedInLinks;
