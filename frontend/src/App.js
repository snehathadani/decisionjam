import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Billing from "./components/billing/Billing";
import {StripeProvider} from 'react-stripe-elements';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
      <Route exact path="/" component={ Landing }/>
      <Route exact path="/billing" component={ Billing }/>
        <StripeProvider apiKey="pk_test_zwL3UU7M5FXPJkHognp6dYFr">
          <Billing />
        </StripeProvider>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
