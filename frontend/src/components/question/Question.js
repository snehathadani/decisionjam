import React, { Component } from "react";
import "./Question.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Question extends Component {
  state = {
    decisionText: "",
    decisionCode: "",
    redirect: false,
    result: false,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  };

  // check auth to view page
  componentDidMount() {
    const headers = this.state.headers;

    axios
      .get(`http://localhost:8000/api/routeThatNeedsJWTToken`, { headers })
      .then(res => {
        this.setState({ result: true });
      })
      .catch(error => {
        this.setState({ result: true, redirect: true });
      });
  }

  setDecisionText = event => {
    this.setState({ decisionText: event.target.value });
  };

  createQuestion = event => {
    // console.log("Sending " + this.state.decisionText);
    const postData = {
      decisionText: this.state.decisionText
    };
    const headers = this.state.headers;
    axios
      .post("http://localhost:8000/api/decision/create", postData, { headers })
      .then(decision => {
        console.log("decision", decision);
        this.setState({ decisionCode: decision.data.decision.decisionCode });
        this.props.history.push(
          "/decision/decisionCode/" + this.state.decisionCode
        );
      })
      .catch(error => console.log("Got error " + error.response.data.error));
  };

  render() {
    // console.log("this.state", this.state);
    if (this.state.result) {
      if (this.state.redirect === true) {
        return <Redirect to={"/signup"} />;
      } else {
        return (
          <div className="question-wrapper">
            <label className="question-title"> Create A New Question </label>
            <div className="question-input-wrapper">
              <textarea
                className="question-input"
                type="text"
                value={this.state.decisionText}
                onChange={this.setDecisionText}
              />
            </div>
            <div>
              <button onClick={this.createQuestion}> Create Question </button>
            </div>
          </div>
        );
      }
    } else {
      return null;
    }
  }
}

export default Question;
