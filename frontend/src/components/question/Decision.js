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
        // console.log("res.data", res.data);
        this.setState({ decision: res.data[0].decisionText });
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
            // pass decisionCode and decision to components
            case "post":
              return (
                <DecisionPost
                  decisionCode={this.state.decisionCode}
                  decision={this.state.decision}
                />
              );
            case "vote":
              return (
                <DecisionVote
                  decisionCode={this.state.decisionCode}
                  decision={this.state.decision}
                />
              );
            case "reveal":
              return (
                <DecisionReveal
                  decisionCode={this.state.decisionCode}
                  decision={this.state.decision}
                />
              );
            default:
              return (
                <DecisionPost
                  decisionCode={this.state.decisionCode}
                  decision={this.state.decision}
                />
              );
          }
        })()}
      </div>
    );
  }
}

export default Decision;
