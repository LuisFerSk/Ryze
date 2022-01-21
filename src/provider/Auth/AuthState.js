import { useState, useEffect, useReducer } from 'react'

import PropTypes from 'prop-types'
import { onAuthStateChanged } from 'firebase/auth'

import { UPDATE_USER } from '../types'
import authContext from './authContext'
import authReducer from './authReducer'
import { auth } from '../../database/auth'
import { usuarioGetByID } from '../../components/usuario/usuarioService'

const AuthState = ({ children }) => {
    const initialState = {
        user: undefined,
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const [result, setResult] = useState()

    const updateUser = (newUser) => {
        try {
            dispatch({
                type: UPDATE_USER,
                payload: newUser,
            });
        } catch (error) {
            console.log(error.response)
        }
    }

    onAuthStateChanged(auth, result => setResult(result))

    useEffect(() => {
        if (result === null) {
            updateUser(result)
            return;
        }

        if (result && typeof result === 'object' && result.uid) {
            usuarioGetByID(result.uid)
                .then(result => updateUser(result))
                .catch(error => console.log(error.a))
            return;
        }
    }, [result])

    return (
        <authContext.Provider
            value={{ user: state.user, }}
        >
            {children}
        </authContext.Provider>
    )
}

AuthState.propTypes = {
    children: PropTypes.node,
}

export default AuthState;