import React, { Component } from 'react';
import {injectStripe} from 'react-stripe-elements';
import "./Billing.css"
import CardSection from './CardSection';
import axios from 'axios';

const ROOT_URL = 'http://localhost:8000';

class CheckoutForm extends Component {
  state = {
    user: '',
    selectedOption: '',
  }

  handleSubmit = (ev) => {
    console.log("confirmed button clicked")
    ev.preventDefault();


    this.props.stripe.createToken({user: this.state.name})
    .then(({token}) => {

    const postData = {
      selectedOption: this.state.selectedOption,
      token: token,
    }
      axios.post(`${ROOT_URL}/billing`, { postData })
      console.log('postData:', postData);
      console.log('Received Stripe token:', token);
    });

    console.log(`You chose ${this.state.selectedOption}`);

  }

  handleOptionChange = (changeEvent) => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  }


  render() {
    return (
        <form onSubmit={this.handleSubmit}>
            <CardSection />
            <div className="radiobuttons">
            <label> 
              <input type="radio" value="option1" checked={this.state.selectedOption === 'option1'} onChange={this.handleOptionChange}/>
              Subscription
            </label>
            <label> 
              <input type="radio" value="option2" checked={this.state.selectedOption === 'option2'} onChange={this.handleOptionChange}/>
              Pay As You Go
            </label>
            </div>
            <button>Confirm order</button>
        </form>
    );
  }
}

export default injectStripe(CheckoutForm);