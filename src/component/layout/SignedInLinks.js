import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from '../../context/authContext'

const SignedInLinks = () => {
  return (
    <AuthContext.Consumer>
    {({currentUser}) => {
                          const { fname, lname } = currentUser
                          const initials = `${fname.charAt(0).toUpperCase()}${lname.charAt(0).toUpperCase()}`
                          return (
                                  <ul className="right">
                                    <li>
                                      <NavLink to="/signin">Log Out</NavLink>
                                    </li>
                                    <li>
                                      <NavLink to="/" className="btn btn-floating blue lighten-1">
                                        {initials}
                                      </NavLink>
                                    </li>
                                  </ul>
                                )
                          }
      }
    </AuthContext.Consumer>
  );
};

export default SignedInLinks;
