import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./SignIn.css";
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
      loginError: false,
    };
  }

  handleUsernameChange = e => {
    this.setState({ username: e.target.value,})
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const User = {
      username: this.state.username,
      password: this.state.password
    };
    axios.post(`${ROOT_URL}/api/login`, User )
    .then(res => { 
      console.log('res.data', res.data)
      if (res.data.success) {
      this.setState({ redirect: true });
      } else {
      // console.log('res.data.msg', res.data.msg)
      this.setState({ loginError: true});
      }
    })
    .catch(error => {
        console.log('error.response', error.response)
    });
  };

  render() {
    // console.log("this.state:", this.state);

    const loginError = this.state.loginError;
    // console.log('loginError', loginError);

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
            Password
            <input type="text" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
          </label>
          <div>
            <p>{loginError ? 'Login Error: User not found.' : ''}</p>
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    );

  }



}

export default Signup;
