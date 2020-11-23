// import React from "react";
// import axios from "./axios";
// import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createList } from "./actions";
import { useStatefulFields } from "../hooks/useStatefulFields";

export default function CreateList() {
    const [values, handleChange] = useStatefulFields();
    const dispatch = useDispatch();
    const newList = useSelector(
        (state) => state.newList && state.newList.filter((user) => user)
    );

    console.log("newList in CreateList", newList);

    const submit = () => {
        console.log("CreateList about to submit");
        dispatch(createList(values));
    };

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
                            // className="input-file"
                        />
                        <Link to="/addItems">
                            <div id="reg-actions">
                                <button
                                    onClick={submit}
                                    id="submit-reg"
                                    className="button"
                                >
                                    Continue
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
//
