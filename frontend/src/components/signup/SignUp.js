import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";

const ROOT_URL = "http://localhost:8000";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      redirect: false,
      loginError: false
    };
  }

  handleUsernameChange = e => {
    this.setState({ username: e.target.value,})
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    axios.post(`${ROOT_URL}/api/users/adduser`, newUser )
    .then(res => { 
      console.log('res', res)
      this.setState({ redirect: true });
    })
    .catch(error => {
        console.log('error.response', error.response)
        this.setState({ loginError: true});
    });
  };

  render() {
    // console.log("this.state:", this.state);

    const loginError = this.state.loginError;
    console.log('ispasswordvalid', loginError);

    if (this.state.redirect) {
      return <Redirect to="/billing" />;
    }

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>
            Username
            <input type="text" name="username" value={this.state.username} onChange={this.handleUsernameChange} />
          </label>
          <label>
            Email
            <input type="text" name="email" value={this.state.email} onChange={this.handleEmailChange} />
          </label>
          <label>
            Password
            <input type="text" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
          </label>
          <div>
            <p>{loginError ? 'Invalid Sign Up' : ''}</p>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );

  }



}

export default Signup;
