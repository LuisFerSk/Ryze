import fire from '../config/firebase';
import "firebase/auth"
import "firebase/firestore";


export const authSignIn = async ({ email, password }) => {
    return await fire.auth().signInWithEmailAndPassword(email, password)
    .then(e => {

        const user = {
            uid: e.user.uid,
            email: e.user.email
        }
        return user;
    })
    .catch(function(error){
        return error.a;
    });
}

export const authSignOut = () => {
    fire.auth().signOut()
}