import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

const Navbar = () => {
  return (
    <nav className="nav-wrapper grey darken-3  ">
      <div className="container left-align">
        <span style={{ fontSize: 30 }}>
          <Link to="/" className=" heading">
            IIQA
          </Link>
        </span>
        <SignedInLinks />
        <SignedOutLinks />
      </div>
    </nav>
  );
};

export default Navbar;
