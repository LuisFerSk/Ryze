import { addDoc, updateDoc, getDocs, deleteDoc, getDocWhere } from '../../database/fire'

const collectionName = 'grupo'

export const grupoAdd = async data => {
    return await addDoc(collectionName, data).then(get => get)
}

export const grupoUpdate = async (id, data) => {
    return await updateDoc(collectionName, id, data).then(get => get)
}

export const grupoGetAll = async () => await getDocs(collectionName).then(get => get)

export const grupoDelete = async id => await deleteDoc(collectionName, id).then(get => get)

export const grupoGetActivated = async () => {
    const field = 'estado'
    const condition = '=='
    const value = true

    return await getDocWhere(collectionName, field, condition, value).then(get => get)
}

export const grupoGetAllProfesor = async (identificacionProfesor) => {
    const field = 'profesor'
    const condition = '=='
    const value = identificacionProfesor

    return await getDocWhere(collectionName, field, condition, value).then(get => get)
}
