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
    console.log("values in CreateList", values);

    const submit = () => {
        console.log("CreateList about to submit");
        dispatch(createList(values));
    };

    return (
        <>
            <div className="create-container">
                <div>
                    <p id="create-header">Create a new list</p>
                    <p id="create-subheader">
                        We need a title for your top-9. You are free to also add
                        a description.
                    </p>
                </div>
                <div className="form-layout">
                    <div className="create-input-fields">
                        <input
                            name="title"
                            placeholder="Title of your list"
                            onChange={handleChange}
                            className="create-input"
                            autoComplete="off"
                        ></input>
                        <input
                            name="description"
                            placeholder="Description"
                            onChange={handleChange}
                            className="create-input"
                            autoComplete="off"
                        ></input>

                        <div id="create-actions">
                            <Link to="/">
                                <div id="">
                                    <button
                                        onClick={submit}
                                        id="cancel-create"
                                        className="create-reg"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Link>
                            {values && values.title && (
                                <Link to="/addItems">
                                    <div id="">
                                        <button
                                            onClick={submit}
                                            id="continue-create"
                                            className="create-reg"
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
//
