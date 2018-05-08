import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./Landing.css";
import splash from "./splash-image.png";


class LandingPage extends Component {
  render() {
    return (
      <div className="landing">
        <div className="Nav">
          <div className="logo">
            <div className="design">
              Decision
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
        <div className="image-container">
          <div className="description-container">
            <div className="slogan">
              Make decisions faster
            </div>
            <div className="description">
            Decision Jam allows teams to make decisions quickly.
            Team members can create questions, provide answers, and vote on proposed answers.
            </div>
            <div className="buy-container">
              <Link className="buy" to="/landing-page">BUY NOW</Link>
            </div>
          </div>
          <div>
            <img className="image" alt="logo" src={splash}/>
          </div>
        </div>
        <div className="pricing-container">
          <div className="pricing-title">Pricing</div>
          <div className="pricing-options">
            <div className="subscription">
              <h1>Subscription</h1>
              <h3>$20 </h3>
              <p>Per Month</p>
              <div className="buy-container pricing-buy">
              <Link className="buy" to="/landing-page">BUY NOW</Link>
              </div>
            </div>
          <div className="perdecision">
            <h1>Pay As You Go</h1>
            <h3>$1.99</h3>
            <p>Per Decision</p>
            <div className="buy-container pricing-buy">
            <Link className="buy" to="/landing-page">BUY NOW</Link>
            </div>
          </div>
          </div>
        </div>

        <div className="footer">
          DecisionJam 2018
        </div>
      </div>
    );
  }
}

export default LandingPage;
