import React from "react";
import Registration from "./Registration";
import Login from "./Login";
import Reset from "./Reset";
import App from "./App";
import { HashRouter, Route } from "react-router-dom";

export default function Welcome() {
    return (
        <div id="welcome-header">
            <div id="welcome-title">
                <p id="welcome">top9</p>
            </div>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset" component={Reset} />
                    <Route path="/user" component={App} />
                </div>
            </HashRouter>
        </div>
    );
}
