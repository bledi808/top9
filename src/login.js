import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {};
        // this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log("e.target.value", e.target.value);
        this.setState(
            {
                [e.target.name]: e.target.value,
            }
            // () => console.log("this.state in the callback: ")
        );
    }

    submit() {
        console.log("Login axios about to submit");
        axios
            .post("/login", this.state)
            .then((response) => {
                console.log("response in submit axios", response);
                if (response.data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: response.data.error,
                    });
                }
            })
            .catch((err) => {
                console.log("err in submit() axios", err);
            });
    }

    render() {
        return (
            <>
                <div className="main-container" id="main-container-login">
                    <div id="register">
                        <p>Login in with your details</p>
                    </div>
                    <div className="form-layout">
                        <input
                            name="email"
                            placeholder="Email"
                            onChange={(e) => this.handleChange(e)}
                            className="reg-input"
                            autoComplete="off"
                        ></input>
                        <input
                            name="password"
                            placeholder="Password"
                            type="password"
                            onChange={(e) => this.handleChange(e)}
                            className="reg-input"
                            autoComplete="off"
                        ></input>
                        <div id="reg-actions">
                            <div id="already-reg">
                                <Link
                                    to="/"
                                    style={{
                                        textDecoration: "none",
                                    }}
                                >
                                    <span className="link">Register</span>
                                </Link>
                            </div>
                            <div id="already-reg">
                                <button
                                    onClick={() => this.submit()}
                                    id="continue-create"
                                    className="create-reg" // className="button"
                                >
                                    Log in
                                </button>
                            </div>
                        </div>
                        <div id="reset-div">
                            <div id="already-reg">
                                <Link
                                    to="/reset"
                                    style={{ textDecoration: "none" }}
                                >
                                    <span id="reset-link" className="link">
                                        Forgot password?
                                    </span>
                                </Link>{" "}
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.error && (
                    <p className="error-msg">{this.state.error}</p>
                )}
            </>
        );
    }
}
