import { ESTUDIANTE, PROFESOR } from '../../_mocks_/roles'
import { setDoc, updateDoc, getDoc, getDocWhere } from '../../database/fire'

const collectionName = 'users'

export const usuarioUpdate = (id, data, handled) => {
    updateDoc(collectionName, id, data).then(result => {
        handled(result)
    })
}

export const usuarioAdd = (data) => {
    const { email } = data;
    return setDoc(collectionName, email, data).then(result => result)
}

export const usuarioGetAll = () => {
    const field = 'tipo'
    const condition = 'in'
    const value = [ESTUDIANTE, PROFESOR]
    return getDocWhere(collectionName, field, condition, value).then(get => get)
}

export const usuarioGetByID = id => {
    return getDoc(collectionName, id).then(get => get)
}

export const usuarioGetAllProfesor = () => {
    const field = 'tipo'
    const condition = '=='
    const value = PROFESOR
    return getDocWhere(collectionName, field, condition, value).then(get => get)
}

export const usuarioGetAllEstudiante = () => {
    const field = 'tipo'
    const condition = '=='
    const value = ESTUDIANTE
    return getDocWhere(collectionName, field, condition, value).then(get => get)
}