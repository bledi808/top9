import { useState } from "react";

export function useStatefulFiles() {
    const [files, setFiles] = useState({});

    const handleChangeFiles = (e) => {
        setFiles({
            [e.target.name]: e.target.files[0],
        });
        let labelName = e.target.files[0].name;
        var inputs = document.querySelectorAll(".input-file");
        Array.prototype.forEach.call(inputs, function (input) {
            var label = input.nextElementSibling,
                labelVal = labelName;
            var fileName = "";
            if (fileName) {
                label.querySelector("span").innerHTML = fileName;
            } else {
                label.innerHTML = labelVal;
            }
        });
    };
    return [files, handleChangeFiles];
}
