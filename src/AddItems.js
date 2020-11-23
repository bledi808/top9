import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItems, getList } from "./actions";
import { useStatefulFields } from "../hooks/useStatefulFields";
import { useStatefulFiles } from "../hooks/useStatefulFiles";

export default function AddList() {
    const [values, handleChange] = useStatefulFields();
    const [files, handleChangeFiles] = useStatefulFiles();
    const [count, setCount] = useState(1);
    const [error, setError] = useState(false); // set to true if not all tiles are filled  when Posting list
    const dispatch = useDispatch();
    const latestList = useSelector(
        (state) => state.latestList && state.latestList.filter((user) => user)
    );
    const listItems = useSelector(
        (state) => state.listItems && state.listItems.filter((user) => user)
    );

    useEffect(() => {
        dispatch(getList());
    }, []);

    const submit = (itemOrder) => {
        console.log("AddItems about to submit");
        let listId = latestList[0].id;
        // let itemOrder = int;
        dispatch(addItems({ files, listId, itemOrder }));
        setTimeout(setCount(count + 1));
        // dispatch(addItems({ file: values.file, listId: latestList[0].id }));
        // location.replace("/addItems");
        // setGrid(true);
        ///////// how to clear set the input values? e.target.value = "";
    };

    const publish = () => {
        console.log("PUBLISH button clicked");
        location.replace("/displayList");
    };
    const clear = () => {
        console.log("CLEAR button clicked");
        location.replace("/addItems");
    };

    // console.log("count in addItems", count);

    const getAddItemDisplay = () => {
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
                                    </div>
                                    <div className="list-item">
                                        <input
                                            onChange={handleChange}
                                            name="name"
                                            placeholder="Name (Optional)"
                                            autoComplete="off"
                                            className="input"
                                        ></input>
                                        <input
                                            onChange={handleChangeFiles}
                                            id="file"
                                            type="file"
                                            name="file"
                                            placeholder="image/*"
                                            className="input-file"
                                            data-multiple-caption="{count} files selected"
                                            multiple
                                        />
                                        <label
                                            className="add-item-button"
                                            id="file-label"
                                            htmlFor="file"
                                        >
                                            Select item
                                        </label>
                                        <button
                                            // onClick={submit}
                                            className="add-item-button"
                                        >
                                            Load item
                                        </button>
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
                    {/* {listItems &&
                    listItems.map((item) => (
                        <div key={item.id} id=""> */}
                    <div id="grid-layout">
                        <>
                            <div className="list-item">
                                {listItems && listItems[0] && (
                                    <img
                                        id="grid-image"
                                        src={listItems[0].url}
                                    />
                                )}

                                <input
                                    onChange={handleChangeFiles}
                                    id="file"
                                    type="file"
                                    name="file"
                                    placeholder="image/*"
                                    className="input-file"
                                    data-multiple-caption="{count} files selected"
                                    multiple
                                />
                                <label
                                    className="add-item-button"
                                    id="file-label"
                                    htmlFor="file"
                                >
                                    Select item
                                </label>
                                <button
                                    onClick={() => submit(1)}
                                    className="add-item-button"
                                >
                                    Load item
                                </button>
                            </div>
                            {/* {error && (
                                <div className="list-item" id="list-item-error">
                                    Empty
                                </div>
                            )} */}
                        </>

                        <div className="list-item">
                            {/* {listItems && !listItems[1] && <div>2</div>} */}
                            {count < 2 && <div id="index">2</div>}
                            {listItems && listItems[1] && (
                                <img id="grid-image" src={listItems[1].url} />
                            )}
                            {listItems && listItems[0] && !listItems[1] && (
                                <>
                                    <input
                                        onChange={handleChangeFiles}
                                        id="file"
                                        type="file"
                                        name="file"
                                        placeholder="image/*"
                                        className="input-file"
                                        data-multiple-caption="{count} files selected"
                                        multiple
                                    />
                                    <label
                                        className="add-item-button"
                                        id="file-label"
                                        htmlFor="file"
                                    >
                                        Select item
                                    </label>
                                    <button
                                        onClick={() => submit(2)}
                                        className="add-item-button"
                                    >
                                        Load item
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="list-item">
                            {count < 3 && <div id="index">3</div>}
                            {listItems && listItems[2] && (
                                <img id="grid-image" src={listItems[2].url} />
                            )}
                            {listItems && listItems[1] && !listItems[2] && (
                                <>
                                    <input
                                        onChange={handleChangeFiles}
                                        id="file"
                                        type="file"
                                        name="file"
                                        placeholder="image/*"
                                        className="input-file"
                                        data-multiple-caption="{count} files selected"
                                        multiple
                                    />
                                    <label
                                        className="add-item-button"
                                        id="file-label"
                                        htmlFor="file"
                                    >
                                        Select item
                                    </label>
                                    <button
                                        onClick={() => submit(3)}
                                        className="add-item-button"
                                    >
                                        Load item
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="list-item">4</div>
                        <div className="list-item">5</div>
                        <div className="list-item">6</div>
                        <div className="list-item">7</div>
                        <div className="list-item">8</div>
                        <div className="list-item">9</div>
                    </div>
                    {/* </div> */}
                    {/* ))} */}
                    <div id="publish-grid">
                        <div className="list-item" id="publish-box">
                            {!listItems && <div id="add-items"> Add </div>}
                            {listItems && listItems[0] && !listItems[2] && (
                                <div id="clear-items" onClick={clear}>
                                    Clear
                                </div>
                            )}
                            {listItems && listItems[2] && (
                                <div id="publish-items" onClick={publish}>
                                    Publish
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            {getAddItemDisplay()}

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
