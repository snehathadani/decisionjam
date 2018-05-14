import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import history from '../BrowserHistory';

class Main extends Component {
    state = {
        decisionCode : '',
    }
    
    render() {
        return (
            <div>
                <label> "Lucky You" </label>
                <div>
                    <input type = "text"
                           value = {this.state.decisionCode}
                           onChange = {this.setDecisionCode}></input>
                    <button onClick = {this.joinDecision}> Join </button>       
                </div>
                </div>
        );
    }

    setDecisionCode = (event) => {
        this.setState({decisionCode: event.target.value});
    }  

    joinDecision = (event) => {
        this.props.history.push('/decision-post/' + this.state.decisionCode);
    }

}
export default Main;