import { addDoc, updateDoc, getDocs, deleteDoc } from '../../database/fire'

const collectionName = 'asignatura'

export const asignaturaAdd = data => {
    return addDoc(collectionName, data).then(get => get)
}

export const asignaturaUpdate = (id, data) => {
    return updateDoc(collectionName, id, data).then(get => get)
}

export const asignaturaGetAll = () => {
    return getDocs(collectionName).then(get => get)
}

export const asignaturaDelete = id => {
    return deleteDoc(collectionName, id).then(get => get)
}

