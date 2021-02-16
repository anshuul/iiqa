import React from "react";
import { Link, NavLink } from "react-router-dom";

const SignedInLinks = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/signin">Log Out</NavLink>
      </li>
      <li>
        <NavLink to="/" className="btn btn-floating blue lighten-1">
          AT
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedInLinks;
