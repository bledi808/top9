import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { receiveFriends, acceptFriend, removeFriend } from "./actions";

// export default function CreateList() {
//     const dispatch = useDispatch();
// const allFriends = useSelector(
//     (state) => state.friendsList && state.friendsList.filter((user) => user)
// );

export default class CreateList extends React.Component {
    constructor() {
        super();
        this.state = {};
        // this.handleChange = this.handleChange.bind(this);
    }

    //for the text inputs
    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            }
            // () => console.log("this.state in the callback: ")
        );
    }

    // for the cover file submission
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.files[0],
            newImage: e.target.files[0].name,
        });
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
                        <p>Create a new list</p>
                    </div>
                    <div className="form-layout">
                        <div className="input-fields">
                            <input
                                name="title"
                                placeholder="Title of your list"
                                onChange={(e) => this.handleChange(e)}
                                className="reg-input"
                                autoComplete="off"
                            ></input>
                            <input
                                name="description"
                                placeholder="Description"
                                onChange={(e) => this.handleChange(e)}
                                className="reg-input"
                                autoComplete="off"
                            ></input>
                            <input
                                onChange={(e) => this.handleChange(e)}
                                id="file"
                                type="file"
                                name="file"
                                placeholder="image/*"
                                className="input-file"
                            >
                                Cover Photo
                            </input>
                            <div id="reg-actions">
                                <button
                                    onClick={() => this.submit()}
                                    id="submit-reg"
                                    className="button"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {this.state.error && (
                    <p className="error-msg">{this.state.error}</p>
                )} */}
            </>
        );
    }
}
