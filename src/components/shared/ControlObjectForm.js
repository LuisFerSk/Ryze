import { useState } from "react";
import PropTypes from 'prop-types';

const ControlObjectForm = (init, setMensaje) => {
    const [value, setValue] = useState(init);

    const updateState = (e) => {
        setMensaje();
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    return [value, setValue, updateState]
}

ControlObjectForm.prototype = {
    init: PropTypes.object.isRequired,
    setMensaje: PropTypes.func.isRequired
}

export default ControlObjectForm