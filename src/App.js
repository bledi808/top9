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
// import Logo from "./Logo"; // create logo component
// import Profile from "./Profile";
// import FindPeople from "./FindPeople";
// import NavBar from "./NavBar";

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
                        {/* <Link
                            to="/createList"
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <p>Create List</p>
                        </Link> */}
                        <a
                            href="/createList"
                            style={{
                                textDecoration: "none",
                                color: "#408ea3",
                            }}
                        >
                            <p>CREATE</p>
                        </a>
                        {/* <Link
                            to="/addItems"
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <p>Add Items</p>
                        </Link>
                        <Link
                            to="/reviewList"
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <p>Review List </p>
                        </Link> */}
                        <Link
                            to="/explore"
                            style={{
                                textDecoration: "none",
                                color: "#408ea3",
                            }}
                        >
                            <p>EXPLORE</p>
                        </Link>
                        <Link
                            to="/favourites"
                            style={{
                                textDecoration: "none",
                                color: "#408ea3",
                            }}
                        >
                            <p>FAVOURITES</p>
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
                        <Route
                            path="/createList"
                            render={() => <CreateList />}
                        />
                        <Route path="/addItems" component={AddItems} />
                        <Route path="/explore" component={Explore} />
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
