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

    const submit = () => {};

    return (
        <>
            <div id="explore-layout">
                <div id="search-input-div">
                    <input
                        className="reg-input"
                        id="search-input"
                        autoComplete="off"
                        placeholder="Explore lists by name"
                        onChange={(e) =>
                            dispatch(searchListName(e.target.value))
                        }
                        // defaultValue={search}
                    ></input>
                    {!mostRecentLists && <p>No results</p>}
                </div>
                <div id="search-layout">
                    {mostRecentLists &&
                        mostRecentLists.map((list) => (
                            <div key={list.id} id="search-container">
                                {/* <div id="search-image-container">
                                        <img
                                            className="search-image"
                                            src={list.url || "/default.jpg"}
                                        />
                                    </div> */}
                                <a className="explore-headings">Title:</a>
                                <div id="search-name">{list.list_name}</div>
                                <a className="explore-headings">Description:</a>
                                <div id="search-name">{list.description}</div>
                                <a className="explore-headings">Added:</a>
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
                                        <div id="view-list">View</div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
