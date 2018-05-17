import React, { Component } from "react";
import axios from "axios";

const ROOT_URL = "http://localhost:8000";

class DecisionVote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answersArray: [],
      newAnswer: "",
      decisionCode: this.props.decisionCode
    };
  }

  componentDidMount = () => {
    const decisionCode = this.state.decisionCode;

    // use decisionCode to query answers
    axios
      .get(`${ROOT_URL}/api/decision/${decisionCode}`)
      .then(res => {
        console.log("res", res);
        this.setState({
          // answersArray: newAnswersArray
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    console.log("this.props", this.props);
    console.log("this.state", this.state);

    const answersArray = this.state.answersArray.length;

    return (
      <div className="reveal-container">
        <div className="reveal-title">We have a winner!</div>
        <div className="answers-container">
          {this.state.answersArray.map((answers, i) => (
            <div className="answer-container" key={i}>
              <div className="answer-text">{answers.answer}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default DecisionVote;
