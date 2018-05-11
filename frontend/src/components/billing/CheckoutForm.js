import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { injectStripe } from "react-stripe-elements";
import "./Billing.css";
import CardSection from "./CardSection";
import axios from "axios";

const ROOT_URL = "http://localhost:8000";

class CheckoutForm extends Component {
  state = {
    user: "",
    selectedOption: "",
    redirect: false
  };

  handleSubmit = e => {
    // console.log("confirmed button clicked")
    e.preventDefault();
    this.props.stripe
      .createToken({ user: this.state.name })
      .then(({ token }) => {
        const postData = {
          selectedOption: this.state.selectedOption,
          token: token
        };
        axios.post(`${ROOT_URL}/api/payment`, { postData }).then(() => {
          this.setState({ redirect: true });
        });
        console.log('Received Stripe token:', token);
      });
  };

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  render() {
    console.log("this.state:", this.state);
    if (this.state.redirect) {
      return <Redirect to="/payment-result" />;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <div className="radiobuttons">
          <label>
            <input
              type="radio"
              value="Monthly"
              checked={this.state.selectedOption === "Monthly"}
              onChange={this.handleOptionChange}
            />
            Monthly
          </label>
          <label>
            <input
              type="radio"
              value="HalfYearly"
              checked={this.state.selectedOption === "HalfYearly"}
              onChange={this.handleOptionChange}
            />
            6 Months
          </label>
          <label>
            <input
              type="radio"
              value="Yearly"
              checked={this.state.selectedOption === "Yearly"}
              onChange={this.handleOptionChange}
            />
            Yearly
          </label>
        </div>
        <button>Confirm order</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
