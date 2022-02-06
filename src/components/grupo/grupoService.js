import { addDoc, updateDoc, getDocs, deleteDoc, getDocWhere } from '../../database/fire'

const collectionName = 'grupo'

export const grupoAdd = data => {
    return addDoc(collectionName, data).then(get => get)
}

export const grupoUpdate = (id, data) => {
    return updateDoc(collectionName, id, data).then(get => get)
}

export const grupoGetAll = () => {
    return getDocs(collectionName).then(get => get)
}

export const grupoDelete = id => {
    return deleteDoc(collectionName, id).then(get => get)
}

export const grupoGetActivated = () => {
    const field = 'estado'
    const condition = '=='
    const value = true

    return getDocWhere(collectionName, field, condition, value).then(get => get)
}

export const grupoGetAllProfesor = (identificacionProfesor) => {
    const field = 'profesor'
    const condition = '=='
    const value = identificacionProfesor

    return getDocWhere(collectionName, field, condition, value).then(get => get)
}
