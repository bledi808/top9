export default function (state = {}, action) {
    if (action.type == "CREATE_LIST") {
        state = Object.assign({}, state, {
            newList: action.newList,
        });
    }

    //no longer being used in addItems - list details are accessed from global state updated by POST createList
    // if (action.type == "GET_LIST") {
    //     state = Object.assign({}, state, {
    //         latestList: action.latestList,
    //         // listItems: action.newList.cover,
    //     });
    // }

    if (action.type == "ADD_ITEMS") {
        if (!state.listItems) {
            state = Object.assign({}, state, {
                listItems: action.listItems,
            });
        } else {
            state = {
                ...state,
                listItems: [...state.listItems, action.listItems[0]],
            };
        }
    }

    if (action.type == "DISPLAY_LIST") {
        state = Object.assign({}, state, {
            displayList: action.displayList,
            // listItems: action.newList.cover,
        });
    }
    if (action.type == "LATEST_LISTS") {
        state = Object.assign({}, state, {
            latestLists: action.latestLists,
            // listItems: action.newList.cover,
        });
    }
    if (action.type == "SEARCH_LISTNAME") {
        state = Object.assign({}, state, {
            latestLists: action.searchListName,
            // listItems: action.newList.cover,
        });
    }

    // updates state with ACCEPT friend (adds user to Accepted friendList and removes from receivedRequests)
    // if (action.type == "ACCEPT_FRIEND") {
    //     state = {
    //         ...state,
    //         friendsList: state.friendsList.map((user) => {
    //             if (user.id == action.id) {
    //                 console.log("IF state ACCEPT", state);
    //                 return {
    //                     ...user,
    //                     accepted: true,
    //                 };
    //             } else {
    //                 return user;
    //             }
    //         }),
    //         receivedRequests: state.receivedRequests.filter((user) => {
    //             if (user.id == action.id) {
    //                 return;
    //             } else {
    //                 return user;
    //             }
    //         }),
    //     };
    // }

    // //updates state with REMOVE friend; REJECT friend request; CANCEL sent request
    // if (action.type == "REMOVE_FRIEND") {
    //     state = {
    //         ...state,
    //         friendsList: state.friendsList.filter((user) => {
    //             if (user.id == action.id) {
    //                 return;
    //             } else {
    //                 return user;
    //             }
    //         }),
    //         receivedRequests: state.receivedRequests.filter((user) => {
    //             if (user.id == action.id) {
    //                 return;
    //             } else {
    //                 return user;
    //             }
    //         }),
    //         sentRequests: state.sentRequests.filter((user) => {
    //             if (user.id == action.id) {
    //                 return;
    //             } else {
    //                 return user;
    //             }
    //         }),
    //     };
    // }

    // //updates state with chat history (upon mounting as well as after new message)
    // if (action.type == "GET_HISTORY") {
    //     state = Object.assign({}, state, {
    //         chatMessages: action.chatMessages,
    //     });
    // }
    // //updates state with chat history
    // if (action.type == "ADD_MESSAGE") {
    //     state = {
    //         ...state,
    //         chatMessages: [...state.chatMessages, action.message],
    //     };
    // }

    console.log("global state", state);

    return state;
}
