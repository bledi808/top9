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
