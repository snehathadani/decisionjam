import React, { Component } from "react";
import "./Decision.css";
import Post from "./Post.js";
import Vote from "./Vote.js";
import Reveal from "./Reveal.js";

class Decision extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderPage: "post",
      postIsActive: true,
      voteIsActive: false,
      revealIsActive: false
    };
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
    // console.log("this.state", this.state.renderPage);

    return (
      <div>
        <div className="decision-title">Decision Page</div>
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
              return <Post />;
            case "vote":
              return <Vote />;
            case "reveal":
              return <Reveal />;
            default:
              return <Post />;
          }
        })()}
      </div>
    );

    // return (
    //   <div>
    //     <div className="decision-title">Decision Page</div>
    //     <Vote />
    //   </div>
    // );

    // return (
    //   <div>
    //     <div className="decision-title">Decision Page</div>
    //     <Reveal />
    //   </div>
    // );
  }
}

export default Decision;
