import axios from "./axios";

// return an object with a type property and the id of the user whose friendship was accepted.
export async function createList() {
    console.log("createList dispatch clicked by userId: ");
    let formData = {}; //work out how to contruct this
    try {
        let { data } = await axios.post(`/api/createList`, {
            formData,
        });
        console.log("{data} in createList() action axios", data);
        return {
            type: "CREATE_LIST",
            id: data,
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
