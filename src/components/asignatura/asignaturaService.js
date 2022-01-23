import { addDoc, updateDoc, getDocs, deleteDoc } from '../../database/fire'

const collectionName = 'asignatura'

export const asignaturaAdd = async data => {
    return await addDoc(collectionName, data).then(get => get)
}

export const asignaturaUpdate = async (id, data) => {
    return await updateDoc(collectionName, id, data).then(get => get)
}

export const asignaturaGetAll = async () => await getDocs(collectionName).then(get => get)

export const asignaturaDelete = async id => await deleteDoc(collectionName, id).then(get => get)

