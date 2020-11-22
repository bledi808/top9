import React from "react";
// import Profile from "./Profile";

export default function ProfilePic({
    first,
    last,
    imgUrl,
    toggleUploader,
    imgClass,
}) {
    return (
        <>
            <div className={imgClass}>
                <img
                    src={imgUrl || "/default.jpg"}
                    alt={first + " " + last}
                    className="profile-image"
                    onClick={toggleUploader}
                />
            </div>
        </>
    );
}
