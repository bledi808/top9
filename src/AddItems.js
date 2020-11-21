import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItems, createList } from "./actions";
import { useStatefulFields } from "../hooks/useStatefulFields";

export default function AddList() {
    const [values, handleChange] = useStatefulFields();
    const dispatch = useDispatch();
    const newList = useSelector(
        (state) => state.newList && state.newList.filter((user) => user)
    );

    console.log("newList info in AddItems: ", newList);
    // console.log("values: ", values);

    useEffect(() => {
        // dispatch(createList());
    }, []);
    return (
        <>
            <p>Add your list items here</p>
            {/* <div className="main-container" id="main-container-register">
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
            </div> */}
            {/* {this.state.error && (
                    <p className="error-msg">{this.state.error}</p>
                )} */}
        </>
    );
}
// }
