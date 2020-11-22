import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { displayList } from "./actions";
// import { useStatefulFields } from "../hooks/useStatefulFields";

export default function ViewList() {
    // const [values, handleChange] = useStatefulFields();
    const dispatch = useDispatch();
    // const [grid, setGrid] = useState(false);
    const newList = useSelector(
        (state) => state.newList && state.newList.filter((user) => user)
    );

    useEffect(() => {
        dispatch(displayList());
    }, []);

    const submit = () => {
        console.log("CreateList about to submit");
        dispatch(createList(values));
        location.replace("/addItems");
        // setGrid(true);
        ///////// how to clear set the input values? e.target.value = "";
    };

    return (
        <>
            <div id="add-items-container">
                {/* <div className="list-item" id="file-box">
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
                                        name="name1"
                                        placeholder="Name (Optional)"
                                        autoComplete="off"
                                        className="input"
                                    ></input>
                                    <input
                                        onChange={handleChangeFiles}
                                        id="file1"
                                        type="file"
                                        name="file1"
                                        placeholder="image/*"
                                        className="input-file"
                                        data-multiple-caption="{count} files selected"
                                        multiple
                                    />
                                    <label
                                        className="add-item-button"
                                        id="file-label"
                                        htmlFor="file1"
                                    >
                                        Select item
                                    </label>
                                    <button
                                        onClick={submit}
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
                </div> */}
                {/* {displayList &&
                    displayList.map((item) => (
                        <div key={item.id} id=""> */}
                <div id="grid-layout">
                    <div className="list-item">
                        {/* {displayList && (
                            <img id="grid-image" src={displayList[0].url} />
                        )} */}
                    </div>
                    <div className="list-item">
                        {/* {displayList && (
                            <img id="grid-image" src={displayList[1].url} />
                        )} */}
                    </div>
                    <div className="list-item">
                        {/* {displayList && (
                            <img id="grid-image" src={displayList[2].url} />
                        )} */}
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
            </div>
        </>
    );
}
// }
