import React, { Component } from "react";
import "./Decision.css";
import DecisionPost from "./DecisionPost.js";
import DecisionVote from "./DecisionVote.js";
import DecisionReveal from "./DecisionReveal.js";
import axios from "axios";

const ROOT_URL = "http://localhost:8000";

class Decision extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderPage: "post",
      postIsActive: true,
      voteIsActive: false,
      revealIsActive: false,
      decisionCode: props.match.params.id,
      decision: ""
    };
  }

  // get question based on code
  componentDidMount() {
    const decisionCode = this.state.decisionCode;
    axios
      .get(`${ROOT_URL}/api/decision/${decisionCode}`)
      .then(res => {
        // console.log("res", res);
        this.setState({ decision: this.state.decision });
      })
      .catch(error => {
        // console.log("erorr", error.response.data.error);
        this.setState({ decision: error.response.data.error });
      });
  }

  onPostButtonClick = () => {
    this.setState({
      renderPage: "post",
      postIsActive: true,
      voteIsActive: false,
      revealIsActive: false
    });
  };

  onVoteButtonClick = () => {
    this.setState({
      renderPage: "vote",
      postIsActive: false,
      voteIsActive: true,
      revealIsActive: false
    });
  };

  onRevealButtonClick = () => {
    this.setState({
      renderPage: "reveal",
      postIsActive: false,
      voteIsActive: false,
      revealIsActive: true
    });
  };

  render() {
    console.log("this.state", this.state);
    console.log("this.props", this.props);
    // console.log("match", match);

    return (
      <div>
        <div className="decision-title">Decision:{this.state.decision}</div>
        <div className="decision-code">Code:{this.state.decisionCode} </div>
        <div className="decision-buttons-container">
          <button
            className={this.state.postIsActive ? "white" : "gray"}
            onClick={this.onPostButtonClick}
          >
            Post
          </button>
          <button
            className={this.state.voteIsActive ? "white" : "gray"}
            onClick={this.onVoteButtonClick}
          >
            Vote
          </button>
          <button
            className={this.state.revealIsActive ? "white" : "gray"}
            onClick={this.onRevealButtonClick}
          >
            Reveal
          </button>
        </div>
        {(() => {
          switch (this.state.renderPage) {
            case "post":
              return (
                <DecisionPost
                  decisionCode={this.state.decisionCode}
                  question={this.state.answer}
                />
              );
            case "vote":
              return <DecisionVote />;
            case "reveal":
              return <DecisionReveal />;
            default:
              return <DecisionPost />;
          }
        })()}
      </div>
    );
  }
}

export default Decision;
