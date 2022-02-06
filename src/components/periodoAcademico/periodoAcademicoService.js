import { addDoc, updateDoc, getDocs, deleteDoc, getDocWhere } from '../../database/fire'

const collectionName = 'periodo_academico'

export const periodoAcademicoAdd = data => {
    return addDoc(collectionName, data).then(get => get)
}

export const periodoAcademicoUpdate = (id, data) => {
    return updateDoc(collectionName, id, data).then(get => get)
}

export const periodoAcademicoGetAll = () => {
    return getDocs(collectionName).then(get => get)
}

export const periodoAcademicoDelete = id => {
    return deleteDoc(collectionName, id).then(get => get)
}

export const periodoAcademicoGetActived = () => {
    const field = 'estado'
    const condition = '=='
    const value = true

    return getDocWhere(collectionName, field, condition, value).then(get => get)
}
