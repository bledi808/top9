import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { favouriteLists } from "./actions";

export default function Explore() {
    const dispatch = useDispatch();
    const favourites = useSelector((state) => state.favouriteLists);

    console.log("favouriteLists in Favourites: ", favourites);

    useEffect(() => {
        dispatch(favouriteLists());
    }, []);

    return (
        <>
            FAVOURITES
            <div id="search-layout">
                {favourites &&
                    favourites.map((list) => (
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
                                    to={`/displayList/${list.list_id}`}
                                    style={{
                                        textDecoration: "none",
                                    }}
                                >
                                    <div id="view-list">View</div>
                                </Link>
                                {/* <Link
                                    to={`/displayList/${list.lisid}`}
                                    style={{
                                        textDecoration: "none",
                                    }}
                                > */}
                                <div id="view-list">Remove</div>
                                {/* </Link> */}
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}
