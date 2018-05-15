import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

class Navigation extends Component {
  render() {
    // if user is logged in then show signout button

    // if user is logged out then show signin button or signup

    let token = localStorage.getItem("token");
    console.log(token);

    if (token) {
      return (
        <div className="Nav">
          <div className="logo">
            <div className="design">Decision</div>
            <div className="jam">Jam</div>
          </div>
          <div className="sign-container">
            <Link className="button" to="/logout">
              LOGOUT
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="Nav">
          <div className="logo">
            <div className="design">Decision</div>
            <div className="jam">Jam</div>
          </div>
          <div className="sign-container">
            <Link className="signin button" to="/signin">
              SIGN IN
            </Link>
            <Link className="signup button" to="/signup">
              SIGN UP
            </Link>
          </div>
        </div>
      );
    }
  }
}

export default Navigation;
