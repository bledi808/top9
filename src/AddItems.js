import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItems } from "./actions";
import { useStatefulFields } from "../hooks/useStatefulFields";
import { useStatefulFiles } from "../hooks/useStatefulFiles";

export default function AddItems() {
    const [values, handleChange] = useStatefulFields();
    const [files, handleChangeFiles] = useStatefulFiles();
    const [count, setCount] = useState(1);
    const dispatch = useDispatch();
    const newList = useSelector((state) => state.newList);
    const listItems = useSelector((state) => state.listItems);

    console.log("newList in AddItems:", newList);
    console.log("listItems in AddItems:", listItems);

    useEffect(() => {
        // dispatch(getList()); // not using this anymore, add again if user is allowed to refresh on /addItems
    }, []);

    const submit = (itemOrder) => {
        console.log("AddItems about to submit");
        let listId = newList[0].id;
        dispatch(addItems({ files, listId, itemOrder }));
        setTimeout(setCount(count + 1)); // how can this be delayed....
        ///////// how to clear set the input values? e.target.value = "";
    };

    const review = () => {
        // console.log("REVIEW button clicked");
    };

    const clear = () => {
        console.log("CLEAR button clicked");
        location.replace("/createList");
        // if there's time, refresh addList but get List info displayed on the page...
    };

    return (
        <>
            <div id="add-items-container">
                <div className="list-item" id="file-box">
                    {newList &&
                        newList.map((list) => (
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
                                    <img className="friends-image" />
                                </div>
                            </div>
                        ))}
                </div>
                <div id="grid-layout">
                    <>
                        <div className="list-item">
                            {listItems && listItems[0] && (
                                <img id="grid-image" src={listItems[0].url} />
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
                    <div className="list-item">
                        {count < 4 && <div id="index">4</div>}
                        {listItems && listItems[3] && (
                            <img id="grid-image" src={listItems[3].url} />
                        )}
                        {listItems && listItems[2] && !listItems[3] && (
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
                                    onClick={() => submit(4)}
                                    className="add-item-button"
                                >
                                    Load item
                                </button>
                            </>
                        )}
                    </div>
                    <div className="list-item">
                        {count < 5 && <div id="index">5</div>}
                        {listItems && listItems[4] && (
                            <img id="grid-image" src={listItems[4].url} />
                        )}
                        {listItems && listItems[3] && !listItems[4] && (
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
                                    onClick={() => submit(5)}
                                    className="add-item-button"
                                >
                                    Load item
                                </button>
                            </>
                        )}
                    </div>
                    <div className="list-item">
                        {count < 6 && <div id="index">6</div>}
                        {listItems && listItems[5] && (
                            <img id="grid-image" src={listItems[5].url} />
                        )}
                        {listItems && listItems[4] && !listItems[5] && (
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
                                    onClick={() => submit(6)}
                                    className="add-item-button"
                                >
                                    Load item
                                </button>
                            </>
                        )}
                    </div>
                    <div className="list-item">
                        {count < 7 && <div id="index">7</div>}
                        {listItems && listItems[6] && (
                            <img id="grid-image" src={listItems[6].url} />
                        )}
                        {listItems && listItems[5] && !listItems[6] && (
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
                                    onClick={() => submit(7)}
                                    className="add-item-button"
                                >
                                    Load item
                                </button>
                            </>
                        )}
                    </div>
                    <div className="list-item">
                        {count < 8 && <div id="index">8</div>}
                        {listItems && listItems[7] && (
                            <img id="grid-image" src={listItems[7].url} />
                        )}
                        {listItems && listItems[6] && !listItems[7] && (
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
                                    onClick={() => submit(8)}
                                    className="add-item-button"
                                >
                                    Load item
                                </button>
                            </>
                        )}
                    </div>
                    <div className="list-item">
                        {count < 9 && <div id="index">9</div>}
                        {listItems && listItems[8] && (
                            <img id="grid-image" src={listItems[8].url} />
                        )}
                        {listItems && listItems[7] && !listItems[8] && (
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
                                    onClick={() => submit(9)}
                                    className="add-item-button"
                                >
                                    Load item
                                </button>
                            </>
                        )}
                    </div>
                </div>
                {/* </div> */}
                {/* ))} */}
                <div id="publish-grid">
                    <div className="list-item" id="publish-box">
                        {!listItems && <div id="add-items"> Add items </div>}
                        {listItems && listItems[0] && !listItems[2] && (
                            <div id="clear-items" onClick={clear}>
                                Start Again
                            </div>
                        )}

                        {listItems && listItems[0] && (
                            <Link
                                to="/reviewList"
                                style={{
                                    textDecoration: "none",
                                }}
                            >
                                <div id="publish-items" onClick={review}>
                                    Review
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
