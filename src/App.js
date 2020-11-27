import React from "react";
import Uploader from "./Uploader";
import ProfilePic from "./ProfilePic";
import OtherList from "./OtherList";
import CreateList from "./CreateList";
import AddItems from "./AddItems";
import ReviewList from "./ReviewList";
import Explore from "./Explore";
import Favourites from "./Favourites";
import axios from "./axios";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
            headerImgClass: "header-image-container",
            profileImgClass: "big-image-container",
        };
        this.methodInApp = this.methodInApp.bind(this);
    }

    async componentDidMount() {
        try {
            let { data } = await axios.get("/api/user");
            if (data.success) {
                this.setState({
                    first: data.rows.first,
                    last: data.rows.last,
                    imgUrl: data.rows.profile_img,
                    bio: data.rows.bio,
                });
            } else {
                console.log("error with email submission in Password reset");
            }
        } catch (err) {
            console.log("err in componentDidMount() App axios", err);
        }
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    methodInApp(arg) {
        this.toggleUploader();
        this.setState({ imgUrl: arg });
    }

    render() {
        return (
            <BrowserRouter>
                <div id="app-container">
                    <header id="app-header">
                        <div id="main-nav-items">
                            <Link
                                to="/"
                                style={{
                                    textDecoration: "none",
                                    color: "#161113",
                                }}
                            >
                                <p id="explore-header">Explore</p>
                            </Link>
                            <a
                                href="/createList"
                                style={{
                                    textDecoration: "none",
                                    color: "#161113",
                                }}
                            >
                                <p id="create-header">Create</p>
                            </a>
                            <Link
                                to="/favourites"
                                style={{
                                    textDecoration: "none",
                                    color: "#161113",
                                }}
                            >
                                <p id="favourites-header">Favourites</p>
                            </Link>
                        </div>
                        <div
                            style={{
                                fontSize: "x-large",
                                color: "#408ea3",
                                // fontWeight: "650",
                            }}
                        >
                            top9
                        </div>
                        <div id="header-profile-layout">
                            <p id="header-profile-name">
                                {this.state.first} {this.state.last}
                            </p>
                            <div
                                className="profile-container"
                                id="profile-cont"
                            >
                                <ProfilePic
                                    imgUrl={this.state.imgUrl}
                                    toggleUploader={() => this.toggleUploader()}
                                    imgClass={this.state.headerImgClass}
                                />
                            </div>
                        </div>
                    </header>
                    <div id="app-body">
                        <Route
                            path="/createList"
                            render={() => <CreateList />}
                        />
                        <Route path="/addItems" component={AddItems} />
                        <Route exact path="/" component={Explore} />
                        <Route path="/favourites" component={Favourites} />
                        <Route
                            exact
                            path="/reviewList"
                            component={ReviewList}
                        />
                        <Route
                            path="/displayList/:listId"
                            render={(props) => (
                                <OtherList
                                    key={props.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                    </div>
                    <div>
                        {this.state.uploaderIsVisible && (
                            <Uploader
                                methodInApp={this.methodInApp}
                                imgUrl={this.state.imgUrl}
                            />
                        )}
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
