import React, { Component } from "react";
import "./Billing.css";
import { Elements } from "react-stripe-elements";
import InjectedCheckoutForm from "./CheckoutForm";
import { Link } from "react-router-dom";
import axios from "axios";

const ROOT_URL = "http://localhost:8000";

class Billing extends Component {
  state = {
    didFetchResultFromServer: false,
    hasSubscription: false,
    subscription: "",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  };

  componentDidMount() {
    const headers = this.state.headers;
    axios
      .get(`${ROOT_URL}/api/routeThatNeedsJWTToken`, { headers })
      .then(res => {
        // console.log("res", res);
      })
      .catch(error => {
        console.log("error", error);
      });
    axios
      .get(`${ROOT_URL}/api/subscriptionID`, { headers })
      .then(res => {
        console.log("res", res);
        if (res.data.subscription && res.data.subscription.subscriptionID) {
          this.setState({
            hasSubscription: true,
            subscription: res.data.subscription,
            didFetchResultFromServer: true
          });
        } else {
          this.setState({
            hasSubscription: false,
            didFetchResultFromServer: true
          });
        }
      })
      .catch(error => {
        console.log("error", error);
        this.setState({
          didFetchResultFromServer: true
        });
      });
  }

  render() {
    console.log("this.state", this.state);
    const subscription = this.state.subscription;

    // if subscription id, don't show payment form

    if (!this.state.didFetchResultFromServer) {
      return null;
    }
    if (this.state.hasSubscription) {
      return (
        <div className="subscription-info-container">
          <div className="subscription-info-title">
            Subscription Information:
          </div>
          <div className="hr-billing " />

          <div className="subscription-sub-info-container">
            <div>Subscription Type: </div>
            <div>{subscription.subscriptionType}</div>
          </div>
          <div className="subscription-sub-info-container">
            <div>Amount Billed: </div>
            <div>{subscription.amountBilled}</div>
          </div>
          <div className="subscription-sub-info-container">
            <div>Subscription Start Date: </div>
            <div>{subscription.subscriptionStartDate}</div>
          </div>
          <div className="subscription-sub-info-container">
            <div>Subscription End Date: </div>
            <div>{subscription.subscriptionEndDate}</div>
          </div>
        </div>
      );
    } else {
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
}

export default Billing;
