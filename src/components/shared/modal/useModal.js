import { useState } from "react";
import PropTypes from 'prop-types';

const UseModal = ({ initialState = false }) => {
    const [isOpen, setItsOpen] = useState(initialState);
    const [content, setContent] = useState("");

    const openModal = () => setItsOpen(true);
    const closeModal = () => setItsOpen(false);


    return [isOpen, openModal, closeModal, content, setContent];
};

UseModal.prototype = {
    initialState: PropTypes.bool.isRequired
}

export default UseModal;