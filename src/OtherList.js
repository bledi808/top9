import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { displayList, serverMessage } from "./actions";
import axios from "./axios";

export default function OtherList(props) {
    const dispatch = useDispatch();
    const listDoesNotExist = useSelector((state) => state.serverMessage);
    const displayGrid = useSelector((state) => state.displayList);
    const listInfo = useSelector((state) => state.listInfo);
    const [next, setNext] = useState();
    const [previous, setPrevious] = useState();
    const [current, setCurrent] = useState(props.match.params.listId);
    const [buttonText, setButtonText] = useState("");

    let listId = props.match.params.listId;

    console.log("listInfo in OtherList:", listInfo);
    // console.log("listId:", listId);
    // console.log("current :", current);
    // console.log("next:", next);
    // console.log("previous:", previous);
    // console.log("listDoesNotExist in OtherList: ", listDoesNotExist);

    useEffect(() => {
        console.log("USE EFFECT RUNNING");
        let listId = props.match.params.listId;
        dispatch(displayList(current));
        setNextPrevious();
        if (listDoesNotExist) {
            location.replace("/");
        }
        (async () => {
            try {
                let { data } = await axios.get(
                    `/api/favouriteStatus/${listId}`
                );
                console.log("{data} from useEffect axios in OtherList", data);
                setButtonText(data.status);
            } catch (err) {
                console.log("err in useEffect axios in OtherList", err);
            }
        })();
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
    const addToFavourite = async () => {
        try {
            let { data } = await axios.post(`/api/favourite`, {
                buttonText,
                listId,
            });
            console.log("data in favourite axios in OtherProfile", data);
            setButtonText(data.status);
        } catch (err) {
            console.log("err in GET /api/getListById/:listId", err);
        }
    };

    return (
        <>
            <div id="add-items-container">
                {listInfo && (
                    <div className="list-tile" id="list-tile-other">
                        <div className="" id="cover-img-container">
                            <img id="cover-img-explore" src={listInfo.cover} />
                        </div>
                        <div id="list-info">
                            <div id="list-details">
                                <p id="list-title">{listInfo.list_name}</p>
                                <p id="list-description">
                                    {listInfo.description}
                                </p>
                            </div>
                        </div>
                        <div id="explore-link-div-other">
                            <div id="explore-timestamp">
                                {listInfo.created_at.slice(11, 16)}
                                {"   "}
                                {listInfo.created_at.split("T")[0]}
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={addToFavourite}
                                id="favourite-button"
                                className="create-reg"
                            >
                                {buttonText}
                            </button>
                        </div>
                    </div>
                )}
                <div className="grid-layout" id="grid-layout-other">
                    {displayGrid &&
                        displayGrid
                            .slice()
                            .reverse()
                            .map((item) => (
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
                    <Link to={"/displayList/" + next}>
                        <button
                            onClick={nextList}
                            id="continue-create"
                            className="create-reg"
                            style={{
                                fontSize: "17px",
                                width: "180px",
                                marginBottom: "5%",
                                height: "2em",
                            }}
                        >
                            Next List ❯
                        </button>
                    </Link>
                    <Link to={"/displayList/" + previous}>
                        <button
                            onClick={previousList}
                            id="cancel-create"
                            className="create-reg"
                            style={{
                                fontSize: "17px",
                                width: "180px",
                                marginTop: "5%",
                                margin: "5% 0",
                                height: "2em",
                            }}
                        >
                            ❮ Previous List
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
