// import React from "react";

// const DecisionPost = ({ match }) => (
//   <div>
//     <p> Decision code is {match.params.id} </p>
//   </div>
// );

// export default DecisionPost;

import React, { Component } from "react";
import axios from "axios";

const ROOT_URL = "http://localhost:8000";

class DecisionPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      newAnswer: "",
      decisionCode: this.props.decisionCode
    };
  }

  handleAnswerInput = e => {
    e.preventDefault();
    this.setState({ newAnswer: e.target.value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const answersObject = {
      text: this.state.newAnswer //
    };
    const answersArray = this.state.answers;
    answersArray.push(answersObject);
    this.setState({
      answers: answersArray,
      newAnswer: ""
    });

    // save code and answersArray to database
    axios.post(`${ROOT_URL}/api/answer`, answersObject).then(res => {
      console.log("res", res);
      if (res.data.success) {
        this.setState({ redirect: true, subscriptionID: false });
      } else {
        console.log("login error", this.state.loginError);
      }
    });
  };

  render() {
    console.log("this.props", this.props);
    // console.log("this.state", this.state);

    const answersArray = this.state.answers.length;

    return (
      <div className="post-container">
        <div className="answers-container">
          {answersArray === 0 ? (
            <div className="no-answer">Suggest an answer</div>
          ) : (
            <div>
              {this.state.answers.map((answers, i) => (
                <div className="answer-container" key={i}>
                  <div className="answer-text">{answers.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <form
          className="answer-form-container"
          onSubmit={this.handleFormSubmit}
        >
          <input
            type="text"
            className="answer-input"
            placeholder="Suggest an answer..."
            value={this.state.newAnswer}
            onChange={this.handleAnswerInput}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default DecisionPost;
