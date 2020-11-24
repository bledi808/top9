import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { displayList, serverMessage } from "./actions";

export default function OtherList(props) {
    const dispatch = useDispatch();
    // const newList = useSelector((state) => state.newList);
    const listDoesNotExist = useSelector((state) => state.serverMessage);
    const displayGrid = useSelector((state) => state.displayList);

    // console.log("props in OtherList", props);
    // console.log("props in OtherList", props.match.params.listId);

    // console.log("otherList in DisplayList:", otherList);
    // console.log("displayGrid in OtherList:", displayGrid);
    console.log("listDoesNotExist in OtherList: ", listDoesNotExist);
    let listId = props.match.params.listId;

    const Next = (listId) => {
        const result = listId + 1;
        return result;
    };
    const Previous = (listId) => {
        const result = listId - 1;
        return result;
    };

    const now = Next(92);
    console.log("results from maths: ", now);

    useEffect(() => {
        let listId = props.match.params.listId;
        dispatch(displayList(listId));
        if (listDoesNotExist) {
            console.log("list does not exist in OtherList, REROUTING");
            location.replace("/");
        }
    }, [listDoesNotExist]);

    const submit = () => {
        //dispatch an action to get the if of the next/previous listId;
        //store the values in global state in variables: Next and Previous
        //dispatch the above action in useEffect with Next/Prev arguments - i.e:
        // displayList(Next)
        // displayList(Previous)
    };

    const next = () => {};
    const previous = () => {};

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
                    <button id="submit-reg">Back to Explore</button>

                    <button onClick={next} id="submit-reg">
                        Next
                    </button>
                    <button onClick={previous} id="submit-reg">
                        Previous
                    </button>
                </div>
            </div>
        </>
    );
}
