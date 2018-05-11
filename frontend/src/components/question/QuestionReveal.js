// vote page
import React from 'react';
import Answer from '../answers/Answer'

const QuestionVote = ({ isUserAuth, isAdmin, isVoteOpen }) => {
  if (isVoteOpen) {
    < Answer isAdmin={isAdmin} isUserAuth={isUserAuth} />
  }
  else
  <p> No Peeking! Voting still in progress. </p>  

}
export default QuestionVote;