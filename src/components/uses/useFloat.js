import { useState } from 'react'

const useFloat = (initialState = false, initialContent = '') => {
    const [title, setTitle] = useState(initialState)
    const [isOpen, setItsOpen] = useState(initialState)
    const [content, setContent] = useState(initialContent)

    const open = () => setItsOpen(true)
    const close = () => setItsOpen(false)

    return [isOpen, open, close, content, setContent, title, setTitle]
}

export default useFloat;