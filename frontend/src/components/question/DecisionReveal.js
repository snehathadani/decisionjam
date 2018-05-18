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

  componentDidMount() {
    const decisionCode = this.state.decisionCode;
    axios
      .get(`${ROOT_URL}/api/decision/decisionCode/${decisionCode}`)
      .then(res => {
        console.log("res.data", res.data);
        this.setState({
          // decision: res.data[0].decisionText,
          answersArray: res.data[0].answers.map(x => x.answerText)
        });
      })

      .catch(error => {
        // console.log("erorr", error.response.data.error);
        this.setState({ decision: error.response.data.error });
      });
    console.log("answersArray,", this.state.anwersArray);
  }

  render() {
    console.log("this.props", this.props);
    console.log("this.state", this.state);

    const answersArray = this.state.answersArray.length;

    return (
      <div className="reveal-container">
        <div className="answers-container">
          <div className="reveal-title">We have a winner!</div>
          <div>
            {this.state.answersArray.map((answers, i) => (
              <div className="answer-container" key={i}>
                <div className="answer-text">{answers}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default DecisionVote;
