import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./Billing.css"


class PaymentResult extends Component {
    render() {
        return (
            <div className="billing">
                <div className="menu">
                    <Link to="/decisions">Decisions</Link>
                    <Link to="/billing">Billing</Link>
                    <Link to="/settings">Settings</Link>
                </div>
                <div>Success!
                  </div>
                <div className="plans">
                </div>
            </div>
        )
    }
}

export default PaymentResult