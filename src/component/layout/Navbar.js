import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { AuthContext, contextWrapper } from "../../context/authContext";

class NavbarComponent extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.currentUser.uid !== nextProps.currentUser.uid;
  }

  render() {
    return (
      <nav className="nav-wrapper grey darken-3  ">
        <div className="container left-align">
          <span style={{ fontSize: 30 }}>
            <Link to="/" className=" heading">
              IIQA
            </Link>
          </span>
          {this.props.currentUser.uid && this.props.currentUser.uid !== "" ? (
            <SignedInLinks />
          ) : (
            <SignedOutLinks />
          )}
        </div>
      </nav>
    );
  }
}

export default contextWrapper(NavbarComponent)

// export default function Navbar() {
//   return (
//     <AuthContext.Consumer>
//       {({ currentUser }) => {
//         return <NavbarComponent currentUser={currentUser} />;
//       }}
//     </AuthContext.Consumer>
//   );
// }
