import React, { Component } from "react";
import "./Billing.css";
import { Elements } from "react-stripe-elements";
import InjectedCheckoutForm from "./CheckoutForm";
import { Link } from "react-router-dom";

class Billing extends Component {
  render() {
    // console.log(this.props);
    return (
      <div className="billing-container">
        <div className="elements-container">
          <div className="paymentform-title">Payment Form</div>
          <div className="hr-billing " />

          <Elements>
            <InjectedCheckoutForm plan={this.props.match} />
          </Elements>
        </div>

        <div className="continue-container">
          <div className="continue-text">Continue as a free user </div>
          <Link to="/landing-page">Home</Link>
        </div>
      </div>
    );
  }
}

export default Billing;
