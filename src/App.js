import React from "react";
// import Logo from "./Logo"; // create logo component
import Uploader from "./Uploader";
import ProfilePic from "./ProfilePic";
// import Profile from "./Profile";
// import OtherProfile from "./OtherProfile";
// import FindPeople from "./FindPeople";
// import NavBar from "./NavBar";
import CreateList from "./CreateList";
import AddItems from "./AddItems";
import DisplayList from "./DisplayList";
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
        //bind functions
        this.methodInApp = this.methodInApp.bind(this);
        // this.updateBioInApp = this.updateBioInApp.bind(this);
    }

    async componentDidMount() {
        // console.log("App just mounted");
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

    // updateBioInApp(arg) {
    //     this.setState({ bio: arg });
    //     () => {
    //         // console.log("state in App after UpdateBioInApp", this.state);
    //     };
    // }
    logOut() {
        // console.log("logout clicked");
        axios.get("/api/logout").then(() => {
            location.replace("/welcome#/login");
        });
    }

    // deleteAccount() {
    //     // console.log("delete Acct clicked");
    //     axios
    //         .get("/api/delete/account")
    //         .then(() => {
    //             location.replace("/");
    //         })
    //         .catch(function (err) {
    //             console.log("error in axios POST /upload", err);
    //         });
    // }

    render() {
        return (
            <BrowserRouter>
                <div id="app-container">
                    <header id="app-header">
                        <Link
                            to="/createList"
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <p>Create List</p>
                        </Link>
                        <Link
                            to="/addItems"
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <p>Add Items</p>
                        </Link>
                        <Link
                            to="/displayList"
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <p>Display List </p>
                        </Link>
                        <button
                            onClick={this.logOut}
                            // className="navbar-buttons"
                        >
                            Log Out
                        </button>
                        <div id="header-profile-layout">
                            <p id="header-profile-name">
                                {this.state.first} {this.state.last}
                            </p>
                            <div
                                className="profile-container"
                                id="profile-cont"
                            >
                                <ProfilePic
                                    // first={this.state.first}
                                    // last={this.state.last}
                                    imgUrl={this.state.imgUrl}
                                    toggleUploader={() => this.toggleUploader()}
                                    imgClass={this.state.headerImgClass}
                                />
                            </div>
                        </div>
                    </header>
                    <div id="app-body">
                        <Route path="/createList" component={CreateList} />
                        <Route path="/addItems" component={AddItems} />
                        <Route path="/displayList" component={DisplayList} />
                    </div>
                    <div>
                        {this.state.uploaderIsVisible && (
                            <Uploader
                                methodInApp={this.methodInApp}
                                imgUrl={this.state.imgUrl}
                                // toggleUploader={() => this.toggleUploader()}
                            />
                        )}
                    </div>
                    {/* <div id="app-body">
                        <NavBar logoutButton={() => this.logOut()} />
                        <div id="app-content">
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Profile
                                        first={this.state.first}
                                        last={this.state.last}
                                        imgUrl={this.state.profileUrl}
                                        bio={this.state.bio}
                                        profileImgClass={
                                            this.state.profileImgClass
                                        }
                                        toggleUploader={() =>
                                            this.toggleUploader()
                                        }
                                        updateBioInApp={this.updateBioInApp}
                                        deleteAccount={this.deleteAccount}
                                    />
                                )}
                            />
                            <Route
                                path="/user/:id"
                                render={(props) => (
                                    <OtherProfile
                                        key={props.url}
                                        match={props.match}
                                        history={props.history}
                                    />
                                )}
                            />
                            <Route
                                path="/users"
                                render={() => <FindPeople />}
                            />
                            <Route path="/friends" render={() => <Friends />} />
                            
                            <Route path="/chat" component={Chat} />
                        </div>
                    </div> */}
                </div>
            </BrowserRouter>
        );
    }
}
