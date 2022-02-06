import { addDoc, updateDoc, getDocs, deleteDoc, getDocWhere } from '../../database/fire'

const collectionName = 'matricula_academica'

export const matriculaAcademicaAdd = data => {
    return addDoc(collectionName, data).then(get => get)
}

export const matriculaAcademicaUpdate = (id, data) => {
    return updateDoc(collectionName, id, data).then(get => get)
}

export const matriculaAcademicaGetAll = async () => {
    return getDocs(collectionName).then(get => get)
}

export const matriculaAcademicaDelete = id => {
    return deleteDoc(collectionName, id).then(get => get)
}

export const matriculaGetByGrupo = (grupo) => {
    const field = 'grupo'
    const condition = '=='
    const value = grupo

    return getDocWhere(collectionName, field, condition, value).then(get => get)
}
