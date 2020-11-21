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

    const submit = () => {
        console.log("CreateList about to submit");
        dispatch(createList(values));
        // location.replace("/addItems");
        // setGrid(true);
        ///////// how to clear set the input values? e.target.value = "";
    };

    return (
        <>
            <div id="add-items-container">
                <div className="list-item" id="file-box">
                    {latestList &&
                        latestList.map((list) => (
                            <div key={list.id} id="">
                                <div id="list-details">
                                    <p>List Title: {list.list_name}</p>
                                    <p>Desc: {list.description}</p>
                                </div>
                                <div id="item-files">
                                    <p>Add items to your list</p>
                                    <div id="item1">
                                        <input
                                            onChange={handleChange}
                                            name="name"
                                            placeholder="Image 1 name"
                                            autocomplete="off"
                                            class="input"
                                        ></input>
                                        <input
                                            onChange={handleChange}
                                            id="file"
                                            type="file"
                                            name="file"
                                            placeholder="image/*"
                                            class="input-file"
                                            data-multiple-caption="{count} files selected"
                                            multiple
                                        />

                                        <label id="file-label" for="file">
                                            Select image
                                        </label>
                                        {/* <button @click="uploadImage" class="button">Add image</button>     */}
                                    </div>
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
                    <div className="list-item">
                        {/* <div id="item1"> */}

                        <input
                            onChange={handleChange}
                            name="name"
                            placeholder="Name (optional)"
                            autocomplete="off"
                            className="input"
                        ></input>
                        <input
                            onChange={handleChange}
                            id="file"
                            type="file"
                            name="file"
                            placeholder="image/*"
                            className="input-file"
                            data-multiple-caption="{count} files selected"
                            multiple
                        />
                        <label
                            class="add-item-button"
                            id="file-label"
                            for="file"
                        >
                            Select image
                        </label>
                        <button onclick={submit} class="add-item-button">
                            Add image
                        </button>

                        {/* <button @click="uploadImage" class="button">Add image</button>     */}
                        {/* </div> */}
                    </div>
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
