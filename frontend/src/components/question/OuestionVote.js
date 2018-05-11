// vote page
import React from 'react';
import Answer from '../answers/Answer'

const QuestionVote = ({ isUserAuth, isAdmin }) => {
  if (isUserAuth) {
    < Answer isAdmin={isAdmin} isUserAuth={isUserAuth} />
  }
  else
  <p> You must signin to vote</p>  

}
export default QuestionVote;