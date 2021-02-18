import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { AuthContext } from '../../context/authContext'

const Navbar = () => {
  return (
    <AuthContext.Consumer>
      {({currentUser})=> (  
        <nav className="nav-wrapper grey darken-3  ">
          <div className="container left-align">
            <span style={{ fontSize: 30 }}>
              <Link to="/" className=" heading">
                IIQA
              </Link>
            </span>
            {currentUser ? <SignedInLinks /> : <SignedOutLinks />}
          </div>
        </nav>
    )}
    </AuthContext.Consumer>
  );
};

export default Navbar;
