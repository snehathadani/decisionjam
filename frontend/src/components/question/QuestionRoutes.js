import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import QuestionPost from "./QuestionPost";

const QuestionRoutes = ({match}) => (
  <Router>
    <div>
          <NavLink className="navlink" to="/answerPost">Post</NavLink>
          <NavLink className="navlink" to="/answerVote">Vote</NavLink>
          <NavLink className="navlink" to="/answerReveal">Reveal</NavLink>
      <hr />

      <Route  path="/answerPost" component={QuestionPost} />
      <Route path="/answerVote" component={QuestionVote} />
      <Route path="/answerReveal" component={QuestionReveal} />
    </div>
  </Router>
);

export default QuestionRoutes