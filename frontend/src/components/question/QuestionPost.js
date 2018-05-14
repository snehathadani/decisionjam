import React, {Component} from 'react';
import { BrowserRouter, NavLink, Route } from "react-router-dom";// Todo: Create a form for users to input ideas about the question
import Answer from "../answers/Answer"
import Answer from '../answers/Answer'

const QuestionPost = ({ isUserAuth, isAdmin }) => {
    < Answer isAdmin={isAdmin} isUserAuth={isUserAuth} />
}

export default QuestionPost;