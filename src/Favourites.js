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
            <div id="explore-layout">
                <div
                    className="explore-results"
                    id="explore-results-favourites"
                >
                    {favourites &&
                        favourites.map((list) => (
                            <div
                                key={list.id}
                                className="list-tile"
                                id="list-tile-favourites"
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
                                        to={`/displayList/${list.list_id}`}
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
