import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import splash from "./splash-image.png";
import Navigation from "./Navigation";
import Question from "../question/Question";
import { Route } from "react-router-dom";

class LandingPage extends Component {
  render() {
    let token = localStorage.getItem("token");
    console.log(token);

    if (token) {
      return (
        <div>
          <Navigation />
          <h1> Welcome back</h1>
          <Link className="question" to="/question-page">
            Make new decision.
          </Link>
        </div>
      );
    } else {
      return (
        <div className="landing">
          <Navigation />
          <div className="image-container">
            <div className="description-container">
              <div className="slogan">Make decisions faster</div>
              <div className="description">
                Decision Jam allows teams to make decisions quickly. Team
                members can create questions, provide answers, and vote on
                proposed answers.
              </div>
              <div className="buy-container">
                <Link className="buy" to="/landing-page">
                  BUY NOW
                </Link>
              </div>
            </div>
            <div>
              <img className="image" alt="logo" src={splash} />
            </div>
          </div>
          <div className="pricing-container">
            <div className="pricing-title">Pricing Plans</div>
            <div className="pricing-options">
              <div className="options">
                <h1>Unlimited</h1>
                <h3>$5</h3>
                <p>Monthly</p>
                <div className="buy-container pricing-buy">
                  <Link className="buy" to="/billing/Monthly">
                    BUY NOW
                  </Link>
                </div>
              </div>
              <div className="options">
                <h1>Unlimited</h1>
                <h3>$20</h3>
                <p>6 Months</p>
                <div className="buy-container pricing-buy">
                  <Link className="buy" to="/billing/HalfYearly">
                    BUY NOW
                  </Link>
                </div>
              </div>
              <div className="options">
                <h1>Unlimited</h1>
                <h3>$50</h3>
                <p>1 Year</p>
                <div className="buy-container pricing-buy">
                  <Link className="buy" to="/billing/Yearly">
                    BUY NOW
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="footer">DecisionJam 2018</div>
        </div>
      );
    }
  }
}

export default LandingPage;
