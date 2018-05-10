import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Billing from "./components/billing/Billing";
import {StripeProvider} from 'react-stripe-elements';
import Question from "./components/question/Question";
import PaymentResult from "./components/billing/PaymentResult";

class App extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_zwL3UU7M5FXPJkHognp6dYFr">
      <BrowserRouter>
        <div className="App">
        <Route exact path="/" component={ Landing }/>
        <Route exact path="/landing-page" component={ Landing }/>
        <Route exact path="/billing" component={ Billing }/>
        <Route exact path="/question-page" component={ Question }/>
        <Route exact path="/payment-result" component={ PaymentResult }/>
      </div>
      </BrowserRouter>
      </StripeProvider> 

    );
  }
}

export default App;
