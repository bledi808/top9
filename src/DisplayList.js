import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { displayList } from "./actions";
// import { useStatefulFields } from "../hooks/useStatefulFields";

export default function ViewList() {
    const dispatch = useDispatch();
    const newList = useSelector((state) => state.newList);
    const displayGrid = useSelector((state) => state.displayList);

    console.log("newList in DisplayList:", newList);
    console.log("displayGrid in DisplayList:", displayGrid);

    useEffect(() => {
        let listId = newList[0].id;
        dispatch(displayList(listId));
    }, []);

    const submit = () => {
        console.log("CreateList about to submit");
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

                    {/* <div className="list-item">
                                <img id="grid-image" src={item.url} />
                            </div>
                            <div className="list-item">
                                <img id="grid-image" src={item.url} />
                            </div>
                            <div className="list-item">4</div>
                            <div className="list-item">5</div>
                            <div className="list-item">6</div>
                            <div className="list-item">7</div>
                            <div className="list-item">8</div>
                            <div className="list-item">9</div> */}
                </div>
            </div>
        </>
    );
}
