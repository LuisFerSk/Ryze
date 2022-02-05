import { useState, useEffect, useReducer } from 'react'

import PropTypes from 'prop-types'
import { onAuthStateChanged } from 'firebase/auth'

import { UPDATE_USER } from '../types'
import authContext from './authContext'
import authReducer from './authReducer'
import { auth } from '../../database/auth'
import { isObject } from '../../utils/specialFunctions'
import { usuarioGetByID } from '../../components/usuario/usuarioService'

const AuthState = ({ children }) => {
    const initialState = {
        user: undefined,
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const [authState, setAuthState] = useState()

    const updateUser = (newUser) => {
        try {
            dispatch({
                type: UPDATE_USER,
                payload: newUser,
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    onAuthStateChanged(auth, authResult => setAuthState(authResult))

    useEffect(() => {
        if (authState === null) {
            updateUser(authState)
            return;
        }

        if (isObject(authState)) {
            usuarioGetByID(authState.email)
                .then(user => updateUser(user))
                .catch(error => console.log(error.a))
        }
    }, [authState])

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