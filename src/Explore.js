import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { latestLists, searchListName } from "./actions";
// import { useStatefulFields } from "../hooks/useStatefulFields";

export default function Explore() {
    const dispatch = useDispatch();
    const mostRecentLists = useSelector((state) => state.latestLists);
    // const displayGrid = useSelector((state) => state.displayList);

    console.log("mostRecentLists in Explore: ", mostRecentLists);

    useEffect(() => {
        dispatch(latestLists());
    }, []);

    return (
        <>
            <div id="explore-layout">
                <div id="search-input-div">
                    <input
                        className="reg-input"
                        id="search-input"
                        autoComplete="off"
                        placeholder="Search lists by name"
                        onChange={(e) =>
                            dispatch(searchListName(e.target.value))
                        }
                    ></input>
                    {!mostRecentLists && <p>No results</p>}
                </div>
                <div className="explore-results">
                    {mostRecentLists &&
                        mostRecentLists.map((list) => (
                            <div
                                key={list.id}
                                className="list-tile"
                                id="list-tile-explore"
                            >
                                <div className="" id="cover-img-container">
                                    <img
                                        id="cover-img-explore"
                                        src={list.cover}
                                    />
                                </div>
                                <div id="list-info">
                                    <div id="list-details">
                                        <p id="list-title">{list.list_name}</p>
                                        <p id="list-description">
                                            {list.description}
                                        </p>
                                    </div>
                                </div>
                                <div id="explore-link-div">
                                    <div id="explore-timestamp">
                                        {list.created_at.slice(11, 16)}
                                        {"   "}
                                        {list.created_at.split("T")[0]}
                                    </div>
                                    <Link
                                        to={`/displayList/${list.id}`}
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        <button
                                            id="continue-create"
                                            className="create-reg"
                                            style={{
                                                fontSize: "13px",
                                            }}
                                        >
                                            View
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
