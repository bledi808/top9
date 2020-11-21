import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({ logoutButton }) {
    return (
        <div id="app-navbar">
            <Link
                to="/"
                style={{
                    textDecoration: "none",
                }}
            >
                <button className="navbar-buttons">PROFILE</button>
            </Link>
            <Link
                to="/users"
                style={{
                    textDecoration: "none",
                }}
            >
                <button className="navbar-buttons">SEARCH</button>
            </Link>
            <Link
                to="/friends"
                style={{
                    textDecoration: "none",
                }}
            >
                <button className="navbar-buttons">FRIENDS</button>
            </Link>
            <Link
                to="/chat"
                style={{
                    textDecoration: "none",
                }}
            >
                <button className="navbar-buttons">CHAT</button>
            </Link>
            <button onClick={logoutButton} className="navbar-buttons">
                LOGOUT
            </button>
        </div>
    );
}
