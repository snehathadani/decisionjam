import React, { Component } from "react";
import "./Main.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Main extends Component {
  state = {
    decisionCode: "",
    redirect: false,
    result: false,
    jwtToken: localStorage.getItem("token")
  };

  componentDidMount() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: this.state.jwtToken
    };
    axios
      .get(`http://localhost:8000/api/routeThatNeedsJWTToken`, { headers })
      .then(res => {
        this.setState({ result: true });
      })
      .catch(error => {
        this.setState({ result: true, redirect: true });
      });
  }

  setDecisionCode = event => {
    this.setState({ decisionCode: event.target.value });
  };

  joinDecision = event => {
    this.props.history.push(
      "/decision/decisionCode/" + this.state.decisionCode
    );
  };

  render() {
    if (this.state.result) {
      if (this.state.redirect === true) {
        return <Redirect to={"/signup"} />;
      } else {
        return (
          <div className="main-wrapper">
            <label className="luckyyou"> "Lucky You" </label>
            <div className="enter-text">Enter Decision Code</div>
            <div className="main-input-wrapper">
              <input
                className="main-input"
                type="text"
                value={this.state.decisionCode}
                onChange={this.setDecisionCode}
              />
            </div>
            <div>
              <button onClick={this.joinDecision}> Join </button>
            </div>
          </div>
        );
      }
    } else {
      return null;
    }
  }
}
export default Main;
