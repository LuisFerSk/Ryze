import { addDoc, updateDoc, getDocs, deleteDoc, getDocWhere } from '../../database/fire'

const collectionName = 'matricula_academica'

export const matriculaAcademicaAdd = async data => {
    return await addDoc(collectionName, data).then(get => get)
}

export const matriculaAcademicaUpdate = async (id, data) => {
    return await updateDoc(collectionName, id, data).then(get => get)
}

export const matriculaAcademicaGetAll = async () => await getDocs(collectionName).then(get => get)

export const matriculaAcademicaDelete = async id => await deleteDoc(collectionName, id).then(get => get)

export const matriculaGetByGrupo = async (grupo) => {
    const field = 'grupo'
    const condition = '=='
    const value = grupo

    return await getDocWhere(collectionName, field, condition, value).then(get => get)
}
