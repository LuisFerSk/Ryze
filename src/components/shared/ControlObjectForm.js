import { useState } from "react";

const ControlObjectForm = (init, setMensaje) => {
    const [value, setValue] = useState(typeof init === "object" ? init : {});

    const updateState = (e) => {
        setMensaje();
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    return [value, setValue, updateState]
}

export default ControlObjectForm