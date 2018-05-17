import React, { Component } from "react";
import "./Question.css";
import axios from "axios";

class Question extends Component {
  state = {
    decisionText: "",
    jwtToken: localStorage.getItem("token")
  };

  render() {
    return (
      <div>
        <div>
          <label> Question or decision </label>
          <input
            type="text"
            value={this.state.decisionText}
            onChange={this.setDecisionText}
          />
        </div>
        <button onClick={this.createQuestion}> Create Question </button>
      </div>
    );
  }

  setDecisionText = event => {
    this.setState({
      decisionText: event.target.value
    });
  };

  createQuestion = event => {
    console.log("Sending " + this.state.decisionText);
    const postData = {
      decisionText: this.state.decisionText
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: this.state.jwtToken
    };
    console.log("decisionText", this.state.decisionText);

    axios
      .post("http://localhost:8000/api/decision/create", postData, { headers })
      .then(decision => {
        //TODO redirect to the next page with the decsion id here
        console.log(
          "decision.data.decision.decisionCode",
          decision.data.decision.decisionCode
        );
      })
      .catch(error => console.log("Got error " + error.response.data.error));
  };
}

export default Question;
