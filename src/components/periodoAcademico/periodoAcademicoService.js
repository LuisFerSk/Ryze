import { addDoc, updateDoc, getDocs, deleteDoc, getDocWhere } from '../../database/fire'

const collectionName = 'periodo_academico'

export const periodoAcademicoAdd = async data => {
    return await addDoc(collectionName, data).then(get => get)
}

export const periodoAcademicoUpdate = async (id, data) => {
    return await updateDoc(collectionName, id, data).then(get => get)
}

export const periodoAcademicoGetAll = async () => {
    return await getDocs(collectionName).then(get => get)
}

export const periodoAcademicoDelete = async id => {
    return await deleteDoc(collectionName, id).then(get => get)
}

export const periodoAcademicoGetActived = async () => {
    const field = 'estado'
    const condition = '=='
    const value = true

    return await getDocWhere(collectionName, field, condition, value).then(get => get)
}
