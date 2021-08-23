import { useState } from "react";

const UseModal = ({ initialState = false }) => {
    const [isOpen, setItsOpen] = useState(initialState);
    const [content, setContent] = useState("");

    const openModal = () => setItsOpen(true);
    const closeModal = () => setItsOpen(false);


    return [isOpen, openModal, closeModal, content, setContent];
};

export default UseModal;