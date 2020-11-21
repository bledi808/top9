import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItems, getList } from "./actions";
import { useStatefulFields } from "../hooks/useStatefulFields";

export default function AddList() {
    const [values, handleChange] = useStatefulFields();
    const dispatch = useDispatch();
    const latestList = useSelector(
        (state) => state.latestList && state.latestList.filter((user) => user)
    );

    console.log("latestList info in AddItems: ", latestList);
    // console.log("values: ", values);

    useEffect(() => {
        dispatch(getList());
    }, []);
    return (
        <>
            <div id="add-items-container">
                <div className="list-item" id="file-box">
                    <p>Add your list items here</p>
                    {latestList &&
                        latestList.map((list) => (
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
                <div id="grid-layout">
                    <div className="list-item">1</div>
                    <div className="list-item">2</div>
                    <div className="list-item">3</div>
                    <div className="list-item">4</div>
                    <div className="list-item">5</div>
                    <div className="list-item">6</div>
                    <div className="list-item">7</div>
                    <div className="list-item">8</div>
                    <div className="list-item">9</div>
                </div>
                <div id="publish-grid">
                    <div className="list-item" id="publish-box">
                        ▶
                    </div>
                </div>
            </div>
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
            
            {/* {this.state.error && (
                    <p className="error-msg">{this.state.error}</p>
                )} */}
        </>
    );
}
// }
