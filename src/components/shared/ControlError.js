import { useState } from "react";
import PropTypes from 'prop-types';

const ControlError = (init) => {
    const [error, setError] = useState(init);

    const updateError = (key, value) => {
        setError((old) => ({ ...old, [key]: value }));
    }

    return [error, setError, updateError]
}

ControlError.prototype = {
    init: PropTypes.object.isRequired
}

export default ControlError