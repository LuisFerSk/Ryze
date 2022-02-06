import { addDoc, updateDoc, getDocs, deleteDoc, getDocWhere } from '../../database/fire'

const collectionName = 'asistencia'

export const asistenciaAdd = data => {
    return addDoc(collectionName, data).then(get => get)
}

export const asistenciaUpdate = (id, data) => {
    return updateDoc(collectionName, id, data).then(get => get)
}

export const asistenciaGetAll = () => {
    return getDocs(collectionName).then(get => get)
}

export const asistenciaDelete = id => {
    return deleteDoc(collectionName, id).then(get => get)
}

export const asistenciaGetActivated = () => {
    const field = 'estado'
    const condition = '=='
    const value = true

    return getDocWhere(collectionName, field, condition, value).then(get => get)
}
