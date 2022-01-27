import { authCreateUser } from '../../database/auth'
import { ESTUDIANTE, PROFESOR } from '../../_mocks_/roles'
import { response, isObject } from '../../utils/specialFunctions'
import { setDoc, updateDoc, getDoc, getDocWhere } from '../../database/fire'

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
        return response(400, 'email')
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

export const usuarioGetAll = async () => {
    const field = 'tipo'
    const condition = 'in'
    const value = [ESTUDIANTE, PROFESOR]

    return await getDocWhere(collectionName, field, condition, value).then(get => get)
}

export const usuarioGetByID = async id => await getDoc(collectionName, id).then(get => get)

export const usuarioGetAllProfesor = async () => {
    const field = 'tipo'
    const condition = '=='
    const value = PROFESOR

    return await getDocWhere(collectionName, field, condition, value).then(get => get)
}

export const usuarioGetAllEstudiante = async () => {
    const field = 'tipo'
    const condition = '=='
    const value = ESTUDIANTE

    return await getDocWhere(collectionName, field, condition, value).then(get => get)
}