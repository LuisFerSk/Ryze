import app from '../firebaseConfig'
import {
    signOut,
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from 'firebase/auth'
import { response } from '../utils/specialFunctions'

export const auth = getAuth(app)

export const authSignIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
        .then(() => response(200, 'Se inicio sesión correctamente'))
        .catch(error => error)
}

export const authCreateUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => userCredential.user)
        .catch(error => error)
}

export const authSignOut = () => {
    signOut(auth)
}