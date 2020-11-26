import axios from "./axios";

// return an object with a type property and the new list created by the user
export async function createList(values) {
    // console.log("values sent from CreateList", values);
    try {
        let { data } = await axios.post(`/api/createList`, values);
        // console.log("{data} in createList() action axios", data);
        return {
            type: "CREATE_LIST",
            newList: data.rows,
        };
    } catch (err) {
        console.log("err in createList() action axios", err);
    }
}

export async function uploadCover(listId, { file }) {
    // console.log("uploadCover() dispatched from AddItems with listId", listId);
    // console.log("uploadCover() dispatched from AddItems with files", file);
    let formData = new FormData();
    formData.append("file", file);
    formData.append("listId", listId);
    // console.log("form data in UploadCover: ", formData);
    try {
        let { data } = await axios.post(`/api/uploadCover`, formData);
        console.log("{data.rows} in uploadCover() action axios", data.rows);
        return {
            type: "UPLOAD_COVER",
            listCover: data.rows,
        };
    } catch (err) {
        console.log("err in addItems() action axios", err);
    }
}
export async function addItems(values) {
    // console.log("addItems() dispatched from AddItems", values);
    let { file } = values.files;
    let { listId } = values;
    let { itemOrder } = values;
    let formData = new FormData();
    formData.append("file", file);
    formData.append("listId", listId);
    formData.append("itemOrder", itemOrder);
    try {
        let { data } = await axios.post(`/api/addItems`, formData);
        // console.log("{data} in addItems() action axios", data.rows);
        return {
            type: "ADD_ITEMS",
            listItems: data.rows,
        };
    } catch (err) {
        console.log("err in addItems() action axios", err);
    }
}

export async function displayList(listId) {
    console.log("displayList() dispatched from DisplayItems");
    console.log("Latest List Id from DisplayList:", listId);

    try {
        let { data } = await axios.get(`/api/displayList/${listId}`);
        console.log("{data} in displayList() action axios", data);
        if (data.success) {
            return {
                type: "DISPLAY_LIST",
                displayList: data.rows,
                listInfo: data.listInfo,
            };
        } else {
            return {
                type: "SERVER_MESSAGE",
                message: true,
            };
        }
    } catch (err) {
        console.log("err in getListDetails() action axios", err);
    }
}

export async function searchListName(listName) {
    // console.log("searchListName dispatched from Explore");
    // console.log("searchListName value: ", listName);
    try {
        let { data } = await axios.get(`/api/explore/${listName}`);
        console.log("{data.rows} in searchListName() action axios", data);
        return {
            type: "SEARCH_LISTNAME",
            searchListName: data.rows,
            success: data.success,
            // displayList: data.rows,
        };
    } catch (err) {
        console.log("err in searchListName() action axios", err);
    }
}

export async function latestLists() {
    // console.log("latestLists() dispatched from Explore");

    try {
        let { data } = await axios.get(`/api/explore`);
        // console.log("{data.rows} in latestLists() action axios", data.rows);

        return {
            type: "LATEST_LISTS",
            latestLists: data.rows,
        };
    } catch (err) {
        console.log("err in latestLists() action axios", err);
    }
}
export async function favouriteLists() {
    console.log("favouriteLists() dispatched from Favourites");

    try {
        let { data } = await axios.get(`/api/getFavourites`);
        console.log("{data.rows} in favouriteLists action axios", data.rows);

        return {
            type: "GET_FAVOURITES",
            favouriteLists: data.rows,
        };
    } catch (err) {
        console.log("err in favouriteLists() action axios", err);
    }
}
