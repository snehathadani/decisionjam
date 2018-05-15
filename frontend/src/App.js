import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Billing from "./components/billing/Billing";
import { StripeProvider } from "react-stripe-elements";
import Question from "./components/question/Question";
import PaymentResult from "./components/billing/PaymentResult";
import Main from "./components/question/Main";
import DecisionPost from "./components/question/DecisionPost";
import SignUp from "./components/signup/SignUp";
import SignIn from "./components/signin/SignIn";

class App extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_zwL3UU7M5FXPJkHognp6dYFr">
        <BrowserRouter>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/landing-page" component={Landing} />
            <Route exact path="/billing/:id" component={Billing} />
            <Route exact path="/question-page" component={Question} />
            <Route exact path="/payment-result" component={PaymentResult} />
            <Route exact path="/mainpage" component={Main} />
            <Route path="/decision-post/:id" component={DecisionPost} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/logout" component={Landing} />
          </div>
        </BrowserRouter>
      </StripeProvider>
    );
  }
}

export default App;
