import { useState } from "react";

export function useStatefulFields() {
    const [values, setValues] = useState({});

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
            // [e.target.name]: e.target.files[0],
        });
    };

    console.log("useStatefulFields values: ", values);

    return [values, handleChange];
}
