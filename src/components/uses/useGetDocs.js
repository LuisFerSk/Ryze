import { useState, useEffect } from 'react'

const useGetDocs = (get) => {
    const [docs, setDocs] = useState([])

    useEffect(() => {
        get.then((result) => setDocs(result))
        // eslint-disable-next-line
    }, [])

    return [docs, setDocs]
}

export default useGetDocs;