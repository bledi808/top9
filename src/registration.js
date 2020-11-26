import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {};
        // this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            }
            // () => console.log("this.state in the callback: ")
        );
    }

    submit() {
        console.log("Registration axios about to submit");
        axios
            .post("/register", this.state)
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
                <div className="main-container" id="main-container-register">
                    <div id="register">
                        <p>Register with your details</p>
                    </div>
                    <div className="form-layout">
                        <div className="input-fields">
                            <input
                                name="first"
                                placeholder="Name"
                                onChange={(e) => this.handleChange(e)} // instead of binding
                                className="reg-input"
                                autoComplete="off"
                            ></input>
                            <input
                                name="last"
                                placeholder="Surname"
                                onChange={(e) => this.handleChange(e)}
                                className="reg-input"
                                autoComplete="off"
                            ></input>
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
                                <span id="already-reg">
                                    <Link
                                        to="/login"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <span className="link">Log in</span>
                                    </Link>
                                </span>
                                <button
                                    onClick={() => this.submit()}
                                    id="submit-reg"
                                    // className="button"
                                    id="continue-create"
                                    className="create-reg"
                                >
                                    Register
                                </button>
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
