import React, { Component } from "react";
import "./Question.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

const ROOT_URL = "http://localhost:8000";

class Question extends Component {
  state = {
    decisionText: "",
    decisionCode: "",
    redirect: false,
    didFetchResultFromServer: false,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  };

  // check auth to view page
  componentDidMount() {
    const headers = this.state.headers;

    axios
      .get(`${ROOT_URL}/api/routeThatNeedsJWTToken`, { headers })
      .then(res => {
        console.log("res", res);
        console.log("res.data.user.username", res.data.user.username);
        this.setState({ didFetchResultFromServer: true });
      })
      .catch(error => {
        this.setState({ didFetchResultFromServer: true, redirect: true });
      });

    axios
      .post(`${ROOT_URL}/api/subscriptionID`)
      .then(res => {
        console.log("res.data", res);
        if (res.data.success) {
          if (res.data.subscriptionID) {
            this.setState({ redirect: true, subscriptionID: true });
          } else {
            this.setState({ redirect: true, subscriptionID: false });
          }
        } else {
          console.log("login error", this.state.loginError);
          this.setState({ loginError: res.data.msg });
        }
      })
      .catch(error => {
        console.log("error", error.response);
        this.setState({ loginError: error.response.data.error });
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
      .post(`${ROOT_URL}/api/decision/create`, postData, { headers })
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
    console.log("this.state", this.state);

    if (this.state.didFetchResultFromServer) {
      if (this.state.redirect === true) {
        return <Redirect to={"/signup"} />;
      } else {
        // if subscription id then show this
        // else show link to billing page to buy subscription
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
