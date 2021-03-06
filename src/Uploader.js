import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super();
        this.state = {
            newImage: props.imgUrl,
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.files[0],
            newImage: e.target.files[0].name,
        });
        let labelName = e.target.files[0].name;
        var inputs = document.querySelectorAll(".input-file");
        Array.prototype.forEach.call(inputs, function (input) {
            var label = input.nextElementSibling,
                labelVal = labelName;
            var fileName = "";
            if (fileName) {
                label.querySelector("span").innerHTML = fileName;
            } else {
                label.innerHTML = labelVal;
            }
        });
    }

    async uploadImage() {
        var formData = new FormData();
        formData.append("file", this.state.file);

        try {
            let { data } = await axios.post("/upload", formData);
            this.setState({
                newImage: data,
            });
            this.methodInUploader();
        } catch (err) {
            console.log("error in axios POST /upload", err);
        }
    }

    methodInUploader() {
        this.props.methodInApp(this.state.newImage);
    }

    async deleteImage() {
        try {
            await axios.get("/delete/image");
            this.setState({
                newImage: "",
            });
            this.methodInUploader();
        } catch (err) {
            console.log("error in axios POST /upload", err);
        }
    }

    logOut() {
        axios.get("/api/logout").then(() => {
            location.replace("/welcome#/login");
        });
    }

    render() {
        return (
            <>
                <div id="upload-overlay-container">
                    <div
                        id="upload-overlay"
                        onClick={() => this.methodInUploader()}
                    ></div>
                    <div id="upload-modal">
                        <div id="upload-modal-layout">
                            <div id="upload-modal-header">
                                <h2 id="upload-modal-title">
                                    Select profile photo
                                </h2>
                                <p
                                    id="upload-modal-x"
                                    onClick={() => this.methodInUploader()}
                                >
                                    x
                                </p>
                            </div>
                            <input
                                onChange={(e) => this.handleChange(e)}
                                id="file"
                                type="file"
                                name="file"
                                placeholder="image/*"
                                className="input-file"
                            />
                            <label
                                id="continue-create"
                                htmlFor="file"
                                className="create-reg"
                                style={{ fontSize: "medium", width: "150px" }}
                            >
                                Select image
                            </label>
                            <div id="uploader-buttons-div">
                                <button
                                    onClick={() => this.uploadImage()}
                                    id="continue-create"
                                    className="create-reg"
                                >
                                    Upload image
                                </button>
                                <button
                                    onClick={() => this.deleteImage()}
                                    id="cancel-create"
                                    className="create-reg"
                                >
                                    Remove image
                                </button>
                                <button
                                    onClick={this.logOut}
                                    id="cancel-create"
                                    className="create-reg"
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
