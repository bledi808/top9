import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { displayList, serverMessage } from "./actions";
import axios from "./axios";

export default function OtherList(props) {
    const dispatch = useDispatch();
    const listDoesNotExist = useSelector((state) => state.serverMessage);
    const displayGrid = useSelector((state) => state.displayList);
    const [next, setNext] = useState();
    const [previous, setPrevious] = useState();
    const [current, setCurrent] = useState(props.match.params.listId);
    let listId = props.match.params.listId;
    console.log("listId:", listId);
    console.log("current :", current);
    console.log("next:", next);
    console.log("previous:", previous);

    // console.log("listDoesNotExist in OtherList: ", listDoesNotExist);

    useEffect(() => {
        console.log("USE EFFECT RUNNING");
        let listId = props.match.params.listId;
        dispatch(displayList(current));
        setNextPrevious();
        if (listDoesNotExist) {
            location.replace("/");
        }
    }, [listDoesNotExist, current]);

    const setNextPrevious = async () => {
        try {
            let { data } = await axios.get(`/api/getListById/${listId}`);
            setNext(data.rows[0].nextId);
            setPrevious(data.rows[0].previousId);
        } catch (err) {
            console.log("err in GET /api/getListById/:listId", err);
        }
    };

    const nextList = async () => {
        setCurrent(next);
    };
    const previousList = () => {
        setCurrent(previous);
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
                    <Link
                        to="/explore"
                        style={{
                            textDecoration: "none",
                        }}
                    >
                        <button id="submit-reg">Back to Explore</button>
                    </Link>

                    <Link to={"/displayList/" + next}>
                        <button onClick={nextList} id="submit-reg">
                            Next
                        </button>
                    </Link>
                    <Link to={"/displayList/" + previous}>
                        <button onClick={previousList} id="submit-reg">
                            Previous
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
