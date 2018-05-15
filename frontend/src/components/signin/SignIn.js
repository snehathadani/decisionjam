import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./SignIn.css";
import axios from "axios";


const ROOT_URL = "http://localhost:8000";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      redirect: false,
      loginError: false,
      subscriptionID: false,
    };
  }

  
  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
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
    axios
      .post(`${ROOT_URL}/api/login`, User)
      .then(res => {
        // console.log("res.data", res.data);
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          // console.log('res.data.token', res.data.token)
          if (res.data.subscriptionID) {
            this.setState({ redirect: true, subscriptionID: true});
          } else {
            this.setState({ redirect: true, subscriptionID: false});
          }
        } else {
          // console.log('res.data.msg', res.data.msg)
          this.setState({ loginError: true });
        }
      })
      .catch(error => {
        console.log("error.response", error.response);
      });
  };

  render() {
    // console.log("this.state:", this.state);
    // console.log("this.props:", this.props);

    const loginError = this.state.loginError;
    // console.log('loginError', loginError);

    if (this.state.redirect) {
      if (this.state.subscriptionID) {
        return <Redirect to="/question-page" />;
      } else {     
      console.log('redirect')

      const getQueryString = ( field, url ) => {
        let href = url ? url : window.location.href;
        let reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
        let string = reg.exec(href);
        console.log('string', string);
        return string ? string[1] : null;
      };
      let redirect = getQueryString('redirect'); 
      console.log('redirect', redirect);
     
      return <Redirect to={redirect}/>;
      }
    }

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
          </label>
          <label>
            Password
            <input
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </label>
          <div>
            <p>{loginError ? "Login Error: User not found." : ""}</p>
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}

export default Signup;
