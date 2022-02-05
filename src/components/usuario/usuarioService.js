import { ESTUDIANTE, PROFESOR } from '../../_mocks_/roles'
import { response, isObject, isBoolean } from '../../utils/specialFunctions'
import { setDoc, updateDoc, getDoc, getDocWhere } from '../../database/fire'

const collectionName = 'users'

export const usuarioUpdate = async (id, data, handled) => {
    if (!isObject(data)) {
        return response(400, 'Se esperaba un JSON')
    }

    await updateDoc(collectionName, id, data).then(result => {
        handled(result)
    })
}

export const usuarioAdd = async (data) => {
    let errores = []
    if (!isObject(data)) {
        errores = [...errores, response(400, 'Se esperaba un JSON')]
    }
    if (errores.length > 0) {
        return errores;
    }
    const { email, identificacion, nombres, apellidos, estado, tipo } = data;
    if (!email) {
        errores = [...errores, response(400, 'Se necesita el email')]
    }
    if (!identificacion) {
        errores = [...errores, response(400, 'Se necesita la identificación')]
    }
    if (!nombres) {
        errores = [...errores, response(400, 'Se necesita los nombres')]
    }
    if (!apellidos) {
        errores = [...errores, response(400, 'Se necesita los apellidos')]
    }
    if (!isBoolean(estado)) {
        errores = [...errores, response(400, 'El estado tiene que ser un boolean')]
    }
    if (!tipo) {
        errores = [...errores, response(400, 'Se necesita el tipo de usuario')]
    }
    if (errores.length > 0) {
        return errores;
    }
    return await setDoc(collectionName, email, data).then(result => result)
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