import { useState } from "react";

const ControlError = (init) => {
    const [error, setError] = useState(typeof init === "object" ? init : {});

    const updateError = (key, value) => {
        setError((old) => ({ ...old, [key]: value }));
    }

    return [error, setError, updateError]
}

export default ControlError