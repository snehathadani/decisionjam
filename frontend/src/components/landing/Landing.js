import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./Landing.css";
import splash from "./splash-image.png";


class LandingPage extends Component {
  render() {
    return (
      <div className="App">
        <div className="Nav">
          <div className="logo">
            <div className="design">
              Design
            </div>
            <div className="jam">
              Jam
            </div>
          </div>
          <div className="sign-container">
            <Link className="signin button" to="/signin">SIGN IN</Link>
            <Link className="signup button" to="/signup">SIGN UP</Link>
          </div>
        </div>
          <img className="image" alt="logo" src={splash}/>
        <div className="slogan">
          Make decisions faster
        </div>
        <div className="description">
        Decision Jam allows teams to make decisions quickly.
        Team members can create questions, provide answers, and vote on proposed answers.
        </div>
        <div className="buy-container">
          <Link className="buy" to="/landing-page">Buy Now</Link>
        </div>
      </div>
    );
  }
}

export default LandingPage;
