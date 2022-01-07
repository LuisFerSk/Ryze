import { authCreateUser } from '../../database/auth'
import { response } from '../../utils/specialFunctions'
import { setDoc, updateDoc, getDocs, deleteDoc } from '../../database/fire'

const collectionName = 'users'

export const usuarioUpdate = async (id, data) => {
    return await updateDoc(collectionName, id, data).then(get => get)
}

export const usuarioAdd = async data => {
    if (typeof data !== 'object') {
        return response(400, 'Se esperaba un JSON')
    }

    const { email, cedula } = data;

    let result;

    Promise.all([
        await authCreateUser(email, cedula)
            .then(userData => result = userData)
            .catch(error => error.a),
        await setDoc(collectionName, result.uid, data)
            .then(userData => result = userData)
            .catch(error => error.a)
    ])

    return result;
}

export const usuarioGet = async () => await getDocs(collectionName).then(get => get)

export const usuarioDelete = async id => await deleteDoc(collectionName, id).then(get => get)
