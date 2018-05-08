import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Question from "./components/question/Question";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      <Route exact path="/landing-page" component={ Landing }/>
      <Route exact path="/question-page" component={ Question }/>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
