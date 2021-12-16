import { useState } from "react";

import { Alert } from "@material-ui/core";

const useMensaje = () => {
    const [mensaje, setMensaje] = useState();

    const updateMensaje = (severity, label) => {
        if (severity && label) {
            setMensaje(
                <Alert severity={severity}>
                    {label}
                </Alert>
            )
            return;
        }
        setMensaje();
    }

    return [mensaje, updateMensaje];
}

export default useMensaje;