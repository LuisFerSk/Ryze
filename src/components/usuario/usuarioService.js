import { authCreateUser } from '../../database/auth'
import { response, isObject } from '../../utils/specialFunctions'
import { setDoc, updateDoc, getDocs, getDoc } from '../../database/fire'

const collectionName = 'users'

export const usuarioUpdate = async (id, data) => {
    return await updateDoc(collectionName, id, data).then(get => get)
}

export const usuarioAdd = async data => {
    if (!isObject(data)) {
        return response(400, 'Se esperaba un JSON')
    }

    const { email, identificacion } = data;

    if (!email) {
        return response(400, '')
    }


    let result;

    Promise.all([
        await authCreateUser(email, identificacion)
            .then(userData => result = userData)
            .catch(error => error.a),
        await setDoc(collectionName, result.uid, data)
            .then(userData => result = userData)
            .catch(error => error.a)
    ])

    return result;
}

export const usuarioGetAll = async () => await getDocs(collectionName).then(get => get)

export const usuarioGetByID = async id => await getDoc(collectionName, id).then(get => get)
