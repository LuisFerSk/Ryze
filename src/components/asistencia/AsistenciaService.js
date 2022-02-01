import { addDoc, updateDoc, getDocs, deleteDoc, getDocWhere } from '../../database/fire'

const collectionName = 'asistencia'

export const asistenciaAdd = async data => {
    return await addDoc(collectionName, data).then(get => get)
}

export const asistenciaUpdate = async (id, data) => {
    return await updateDoc(collectionName, id, data).then(get => get)
}

export const asistenciaGetAll = async () => await getDocs(collectionName).then(get => get)

export const asistenciaDelete = async id => await deleteDoc(collectionName, id).then(get => get)

export const asistenciaGetActivated = async () => {
    const field = 'estado'
    const condition = '=='
    const value = true

    return await getDocWhere(collectionName, field, condition, value).then(get => get)
}
