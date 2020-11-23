import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { displayList } from "./actions";

export default function DisplayList() {
    const dispatch = useDispatch();
    const newList = useSelector((state) => state.newList);
    const displayGrid = useSelector((state) => state.displayList);

    // console.log("newList in DisplayList:", newList);
    // console.log("displayGrid in DisplayList:", displayGrid);

    useEffect(() => {
        let listId = newList[0].id;
        dispatch(displayList(listId));
    }, []);

    const submit = () => {
        console.log("DisplayList about to submit");
        location.replace("/createList");
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
                        Continue
                    </button>
                </div>
            </div>
        </>
    );
}
