// import React from "react";
// import axios from "./axios";
// import { Link } from "react-router-dom";

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createList } from "./actions";
import { useStatefulFields } from "../hooks/useStatefulFields";

export default function CreateList() {
    const [values, handleChange] = useStatefulFields();
    const dispatch = useDispatch();
    const allFriends = useSelector(
        (state) => state.friendsList && state.friendsList.filter((user) => user)
    );
    const newList = useSelector(
        (state) => state.newList && state.newList.filter((user) => user)
    );

    // console.log("newList in CreateList: ", newList);
    console.log("values: ", values);
    const submit = () => {
        console.log("CreateList about to submit");
        dispatch(createList(values));
        // how to clear set the input values?
        // e.target.value = "";
    };

    // render() {
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
                            onChange={handleChange}
                            className="reg-input"
                            autoComplete="off"
                        ></input>
                        <input
                            name="description"
                            placeholder="Description"
                            onChange={handleChange}
                            className="reg-input"
                            autoComplete="off"
                        ></input>
                        <input
                            onChange={handleChange}
                            id="file"
                            type="file"
                            name="file"
                            placeholder="image/*"
                            className="input-file"
                        />
                        <div id="reg-actions">
                            <button
                                onClick={
                                    // dispatch(createList(values));
                                    submit
                                }
                                id="submit-reg"
                                className="button"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="friends-layout">
                {newList &&
                    newList.map((list) => (
                        <div key={list.id} id="friends-component-container">
                            <div>
                                <p>{list.list_name}</p>
                                <p>{list.description}</p>
                            </div>
                            <div id="friends-image-container">
                                <img
                                    className="friends-image"
                                    // src={list.cover || "/default.jpg"}
                                />
                            </div>
                        </div>
                    ))}
            </div>

            {/* {this.state.error && (
                    <p className="error-msg">{this.state.error}</p>
                )} */}
        </>
    );
}
// }
