import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { displayList, listComplete } from "./actions";
import axios from "./axios";

export default function ReviewList() {
    const dispatch = useDispatch();
    const newList = useSelector((state) => state.newList);
    const listCover = useSelector((state) => state.listCover);
    const displayGrid = useSelector((state) => state.displayList);

    // console.log("newList in DisplayList:", newList);
    // console.log("displayGrid in DisplayList:", displayGrid);

    const listId = newList[0].id;
    console.log("listId: ", listId);

    useEffect(() => {
        // let listId = newList[0].id;
        dispatch(displayList(listId));
    }, []);

    const submit = async () => {
        console.log("DisplayList about to submit");
        // await dispatch(listComplete());
        try {
            let { data } = await axios.post(`/api/listComplete/${listId}`);
            console.log("{data} in completeList() axios", data);
            location.replace("/");
        } catch (err) {
            console.log("err in POST /api/getListById/:listId", err);
        }
    };

    const clear = () => {
        console.log("CLEAR button clicked");
        location.replace("/createList");
        // if there's time, refresh addList but get List info displayed on the page...
    };

    return (
        <>
            <div id="add-items-container">
                <div className="" className="list-tile" id="list-tile-add">
                    <div className="" id="cover-img-container">
                        {listCover && listCover[0] && (
                            <img id="cover-img" src={listCover[0].cover} />
                        )}
                    </div>
                    {newList &&
                        newList.map((list) => (
                            <>
                                <div key={list.id} id="list-info">
                                    <div id="list-details">
                                        <p id="list-title">{list.list_name}</p>
                                        <p id="list-description">
                                            {list.description}
                                        </p>
                                    </div>
                                </div>
                                <div id="explore-link-div-other">
                                    <div id="explore-timestamp">
                                        {list.created_at.slice(11, 16)}
                                        {"   "}
                                        {list.created_at.split("T")[0]}
                                    </div>
                                </div>
                            </>
                        ))}
                </div>
                <div className="grid-layout" id="grid-layout-other">
                    {displayGrid &&
                        displayGrid
                            .slice()
                            .reverse()
                            .map((item, i) => (
                                <div
                                    key={item.item_id}
                                    className="list-item"
                                    id="list-item-other"
                                >
                                    <img id="grid-image" src={item.url} />
                                </div>
                            ))}
                </div>
                <div id="other-list-actions">
                    <button
                        onClick={submit}
                        id="continue-create"
                        className="create-reg"
                        style={{
                            fontSize: "17px",
                            width: "180px",
                            // marginBottom: "3%",
                            height: "2em",
                            border: "1px solid #408ea3",
                            backgroundColor: "#408ea3",
                            color: "white",
                        }}
                    >
                        Publish
                    </button>
                    <button
                        id="cancel-create"
                        className="create-reg"
                        onClick={clear}
                        style={{
                            fontSize: "17px",
                            width: "180px",
                            // marginTop: "5%",
                            margin: "5% 0",
                            height: "2em",
                            border: "1px solid tomato",
                            color: "tomato",
                        }}
                    >
                        Start Again
                    </button>
                </div>
            </div>
        </>
    );
}
