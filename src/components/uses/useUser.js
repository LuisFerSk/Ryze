import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from '../../database/auth'
import { usuarioGetByID } from '../usuario/usuarioService'

const useUser = (init) => {
    const [user, setUser] = useState(init)

    const [result, setResult] = useState()

    onAuthStateChanged(auth, result => setResult(result))

    useEffect(() => {
        if (typeof result === 'object' && result.uid) {
            usuarioGetByID(result.uid).then(result => setUser(result))
        }
    }, [result])

    return user;
}

export default useUser