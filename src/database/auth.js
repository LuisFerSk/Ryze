import app from '../firebaseConfig'
import {
    signOut,
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from 'firebase/auth'
import { response } from '../utils/specialFunctions'

export const auth = getAuth(app)

export const authSignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then(() => response(200, 'Se inicio sesión correctamente'))
        .catch(error => error)
}

export const authCreateUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(() => true)
        .catch(error => error)
}


export const authSignOut = () => {
    signOut(auth)
}