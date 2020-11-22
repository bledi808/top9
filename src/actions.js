import axios from "./axios";

// return an object with a type property and the new list created by the user
export async function createList(values) {
    // console.log("values sent from CreateList", values);
    // let formData = {}; //work out how to contruct this
    try {
        let { data } = await axios.post(`/api/createList`, values);
        console.log("{data} in createList() action axios", data);
        return {
            type: "CREATE_LIST",
            newList: data.rows,
        };
    } catch (err) {
        console.log("err in createList() action axios", err);
    }
}
export async function getList() {
    // console.log("getListDetails() dispatched from AddItems");
    // let formData = {}; //work out how to contruct this
    try {
        let { data } = await axios.get(`/api/getListDetails`);
        // console.log("{data} in getListDetails() action axios", data);
        return {
            type: "GET_LIST",
            latestList: data.rows,
        };
    } catch (err) {
        console.log("err in getListDetails() action axios", err);
    }
}

export async function addItems(values) {
    // console.log("addItems() dispatched from AddItems");
    // console.log("values sent from AddItems", values);
    // // console.log("file sent from AddItems", files.file1);
    // console.log("listId sent from AddItems", values.listId);
    // console.log("file sent from AddItems", values.file1);
    let { file1 } = values.files;
    let { listId } = values;

    let formData = new FormData();
    formData.append("file", file1);

    // var formData = new FormData();
    // formData.append("title", this.title);
    // formData.append("description", this.description);
    // formData.append("username", this.username);
    // formData.append("file", this.file);

    try {
        let { data } = await axios.post(`/api/addItems`, formData, listId);
        console.log("{data} in addItems() action axios", data);
        return {
            type: "ADD_ITEMS",
            newList: data.rows,
        };
    } catch (err) {
        console.log("err in addItems() action axios", err);
    }
}

// App ComponentDidMount axios - refactor later (does this need to be wrapped in an async function)
// try {
//     let { data } = await axios.get("/api/user");
//     this.setState({
//         first: data.rows.first,
//         last: data.rows.last,
//         profile_img: data.rows.profile_img,
//         bio: data.rows.bio,
//     });
// }
