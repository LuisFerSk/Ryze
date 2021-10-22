import { useState, useEffect } from 'react';

import { facultadServices } from '../../services';

const useGetFacultad = () => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        facultadServices.Get().then((result) => setDocs(result))
    }, []);

    return [docs, setDocs];
}

export default useGetFacultad;