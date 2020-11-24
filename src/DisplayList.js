import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { displayList, listComplete } from "./actions";
import axios from "./axios";

export default function DisplayList() {
    const dispatch = useDispatch();
    const newList = useSelector((state) => state.newList);
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
                <div id="grid-layout">
                    {displayGrid &&
                        displayGrid
                            .slice()
                            .reverse()
                            .map((item, i) => (
                                <div key={item.item_id} className="list-item">
                                    <img id="grid-image" src={item.url} />
                                </div>
                            ))}
                </div>
                <div id="reg-actions">
                    <button onClick={submit} id="submit-reg" className="button">
                        Publish
                    </button>
                    <div id="clear-items" onClick={clear}>
                        Start Again
                    </div>
                </div>
            </div>
        </>
    );
}
