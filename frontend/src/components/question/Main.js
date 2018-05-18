import React, { Component } from "react";
import "./Main.css";

class Main extends Component {
  state = {
    decisionCode: ""
  };

  render() {
    return (
      <div className="main-wrapper">
        <label> "Lucky You" </label>
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

  setDecisionCode = event => {
    this.setState({ decisionCode: event.target.value });
  };

  joinDecision = event => {
    this.props.history.push(
      "/decision/decisionCode/" + this.state.decisionCode
    );
  };
}
export default Main;
