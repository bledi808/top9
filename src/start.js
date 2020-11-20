import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
// import App from "./App";

import { createStore, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
// import { init } from "./socket";

import reducer from "./reducer";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
const userIsLoggedIn = location.pathname != "/welcome"; // evaluates to false in /welcome route bc user is on that route

if (!userIsLoggedIn) {
    elem = <Welcome />;
} else {
    // init(store);
    // elem = <Provider store={store}>{/* <App /> */}</Provider>;
    elem = <h1 id="welcome">inside the app</h1>;
}
ReactDOM.render(elem, document.querySelector("main"));
