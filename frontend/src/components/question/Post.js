import React, { Component } from "react";
import axios from "axios";

const ROOT_URL = "http://localhost:8000";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      newAnswer: ""
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
    console.log("this.state", this.state);

    return (
      <div>
        <div>
          <div className="decision-title">Post Page</div>
        </div>
        <div className="answersList">
          {this.state.answers.map((answers, i) => (
            <div className="answer-container" key={i}>
              <div className="answer-text">{answers.text}</div>
            </div>
          ))}
        </div>
        <form
          className="answer-form-container"
          onSubmit={this.handleFormSubmit}
        >
          <input
            type="text"
            name="answer"
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

export default Post;
