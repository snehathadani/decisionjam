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
    console.log("this.state.answers.length", this.state.answers.length);
    const answersArray = this.state.answers.length;
    // console.log("answersArray", answersArray);

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

    // )

    // return <div>hi</div>;

    //   if (answersArray === 0) {
    //     return (
    //       <div className="post-container">
    //         <div className="no-answer">Suggest an answer</div>
    //       </div>
    //     );
    //   } else {
    //     return (
    //       <div className="post-container">
    //         <div className="answersList">
    //           {this.state.answers.map((answers, i) => (
    //             <div className="answer-container" key={i}>
    //               <div className="answer-text">{answers.text}</div>
    //             </div>
    //           ))}
    //         </div>
    //         <form
    //           className="answer-form-container"
    //           onSubmit={this.handleFormSubmit}
    //         >
    //           <input
    //             type="text"
    //             name="answer"
    //             placeholder="Suggest an answer..."
    //             value={this.state.newAnswer}
    //             onChange={this.handleAnswerInput}
    //           />
    //           <button type="submit">Submit</button>
    //         </form>
    //       </div>
    //     );
    //   }
    // }
  }
}

export default Post;
