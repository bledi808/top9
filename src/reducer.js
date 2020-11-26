export default function (state = {}, action) {
    if (action.type == "CREATE_LIST") {
        state = Object.assign({}, state, {
            newList: action.newList,
        });
    }

    if (action.type == "UPLOAD_COVER") {
        state = Object.assign({}, state, {
            listCover: action.listCover,
        });
    }

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
            listInfo: action.listInfo,
        });
    }
    if (action.type == "LATEST_LISTS") {
        state = Object.assign({}, state, {
            latestLists: action.latestLists,
        });
    }
    if (action.type == "SEARCH_LISTNAME") {
        state = Object.assign({}, state, {
            latestLists: action.searchListName,
        });
    }
    if (action.type == "SERVER_MESSAGE") {
        state = Object.assign({}, state, {
            serverMessage: action.message,
        });
    }
    if (action.type == "GET_FAVOURITES") {
        state = Object.assign({}, state, {
            favouriteLists: action.favouriteLists,
        });
    }

    //no longer being used in addItems - list details are accessed from global state updated by POST createList
    // if (action.type == "GET_LIST") {
    //     state = Object.assign({}, state, {
    //         latestList: action.latestList,
    //         // listItems: action.newList.cover,
    //     });
    // }

    console.log("global state", state);

    return state;
}
