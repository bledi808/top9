import { useState } from "react";

export function useStatefulFiles() {
    const [files, setFiles] = useState({});

    const handleChangeFiles = (e) => {
        setFiles({
            // ...files,
            // [e.target.name]: e.target.value,
            [e.target.name]: e.target.files[0],
        });
    };

    console.log("useStatefulFiles file: ", files);

    return [files, handleChangeFiles];
}
