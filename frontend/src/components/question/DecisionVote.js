import React, { Component } from "react";
import axios from "axios";

const ROOT_URL = "http://localhost:8000";

class DecisionVote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      answersArray: [],
      decisionCode: this.props.decisionCode,
      jwtToken: localStorage.getItem("token")
    };
  }

  componentDidMount() {
    const decisionCode = this.state.decisionCode;
    const headers = {
      "Content-Type": "application/json",
      Authorization: this.state.jwtToken
    };
    axios
      .get(`${ROOT_URL}/api/decision/${decisionCode}`, {headers}) 
      .then(res => {
          this.setState({
          decision: res.data[0].decisionText,
          answersArray: res.data[0].answers
        });
      })

      .catch(error => {
        this.setState({ error: error.response.data.error });
      });
  }

  handleAnswerInput = e => {
    e.preventDefault();
    this.setState({ newAnswer: e.target.value });
  };

  handleUpvote(answerId, e) {
    this.handleVote('YES', answerId)
  }

  handleDownvote(answerId, e) {
    this.handleVote('NO', answerId)
  }

  handleVote(upOrDown, answerId) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: this.state.jwtToken
    };
    axios
    .put(`${ROOT_URL}/api/decision/answer/${answerId}/vote?vote=${upOrDown}`,{}, {headers})
    .then(res => { this.setState({...this.state, answersArray: res.data.answers})})
    .catch(e => console.log("Vote not counted"))    
  }

  render() {
    //console.log("this.props", this.props);
    //console.log("this.state", this.state);
    const answersArray = this.state.answersArray.length;

    return (
      <div className="post-container">
        <div className="answers-container">
          {answersArray === 0 ? (
            <div className="no-answer">There are no answers yet. </div>
          ) : (
            <div>
              {this.state.answersArray.map((answer) => (
                <div className="answer-container" key={answer._id}>
                  <div className="answer-text">{answer.answerText}</div>
                    <button onClick={this.handleUpvote.bind(this, answer._id)}> + {answer.upVotes.length}</button>   
                    <button onClick={this.handleDownvote.bind(this, answer._id)}> - {answer.downVotes.length}</button>
                  
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }


}

export default DecisionVote;
