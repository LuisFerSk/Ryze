import app from '../config/firebase';
import {
    signOut,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "firebase/auth";

const auth = getAuth(app);

export const authSignIn = async ({ email, password }) => {
    return await signInWithEmailAndPassword(auth, email, password)
        .then((e) => ({ uid: e.user.uid, email: e.user.email }))
        .catch((error) => error.a);
}

export const createUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => userCredential.user)
        .catch((error) => error);
}
export const getUID = () => {
    let uid;
    onAuthStateChanged(auth, (user) => { if (user) { uid = user; } });
    return uid;
}

export const authSignOut = () => {
    signOut(auth)
}