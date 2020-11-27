import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItems, uploadCover } from "./actions";
import { useStatefulFields } from "../hooks/useStatefulFields";
import { useStatefulFiles } from "../hooks/useStatefulFiles";

export default function AddItems() {
    const [values, handleChange] = useStatefulFields();
    const [files, handleChangeFiles] = useStatefulFiles();
    const [count, setCount] = useState(0);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const newList = useSelector((state) => state.newList);
    const listCover = useSelector((state) => state.listCover);
    const listItems = useSelector((state) => state.listItems);

    // console.log("newList in AddItems:", newList);
    // console.log("listItems in AddItems:", listItems);
    // console.log("listCover in AddItems:", listCover);
    // console.log("listCover.cover in AddItems:", listCover);
    // console.log("files.file: ", files.file);
    // console.log("error in AddItems:", error);

    // useEffect(() => {
    //     // dispatch(getList()); // not using this anymore, add again if user is allowed to refresh on /addItems
    // }, []);

    const submit = (itemOrder) => {
        console.log("AddItems about to submit");
        let listId = newList[0].id;
        if (!files.file) {
            console.log("no files loaded");
            setError("No file selected");
        } else {
            dispatch(addItems({ files, listId, itemOrder }));
            setCount(count + 1);
            files.file = "";
            setError("");
        } // how can this be delayed....
    };

    const submitCover = () => {
        let listId = newList[0].id;
        console.log("UploadCover about to submit for listId", listId);
        if (!files.file) {
            console.log("no files loaded");
            setError("No file selected");
        } else {
            dispatch(uploadCover(listId, files));
            files.file = "";
            setCount(count + 1);
            setError("");
        }
        console.log("REVIEW button clicked");
    };

    const clear = () => {
        console.log("CLEAR button clicked");
        location.replace("/createList");
        // if there's time, refresh addList but get List info displayed on the page...
    };
    const review = () => {
        console.log("REVIEW button clicked");
    };

    return (
        <>
            <div id="add-items-container">
                <div className="" className="list-tile" id="list-tile-add">
                    <div className="" id="cover-img-container">
                        {listCover && listCover[0] && (
                            <img id="cover-img" src={listCover[0].cover} />
                        )}
                        <input
                            onChange={handleChangeFiles}
                            id="file"
                            type="file"
                            name="file"
                            placeholder="image/*"
                            className="input-file"
                        />
                        <label
                            className="add-item-button"
                            id="file-label"
                            htmlFor="file"
                        >
                            Select cover
                        </label>
                        <button
                            onClick={submitCover}
                            className="add-item-button"
                        >
                            Upload cover
                        </button>
                    </div>
                    {newList &&
                        newList.map((list) => (
                            <div key={list.id} id="list-info">
                                <div id="list-details">
                                    <p id="list-title">{list.list_name}</p>
                                    <p id="list-description">
                                        {list.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="grid-layout">
                    <>
                        <div className="list-item">
                            {count < 1 && <div id="index">1</div>}

                            {listItems && listItems[0] && (
                                <img id="grid-image" src={listItems[0].url} />
                            )}
                            {listCover && listCover[0] && (
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
                                        onClick={() => submit(1)}
                                        className="add-item-button"
                                    >
                                        Upload item
                                    </button>
                                </>
                            )}
                        </div>
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
                                    Upload item
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
                                    Upload item
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
                                    Upload item
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
                                    Upload item
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
                                    Upload item
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
                                    Upload item
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
                                    Upload item
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
                                    Upload item
                                </button>
                            </>
                        )}
                    </div>
                </div>
                {/* </div> */}
                {/* ))} */}
                <div id="publish-grid">
                    <div className="status-box" id="publish-box">
                        {!listItems && <div id="add-items"> Add items </div>}
                        {error && (
                            <div className="status-box" id="list-item-error">
                                {error}
                            </div>
                        )}
                        {listItems && listItems[0] && !listItems[8] && (
                            <div id="clear-items" onClick={clear}>
                                Start again
                            </div>
                        )}
                        {listItems && listItems[8] && (
                            <Link
                                to="/reviewList"
                                style={{
                                    textDecoration: "none",
                                    color: "black",
                                }}
                            >
                                <div id="publish-items" onClick={review}>
                                    Review top9
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
