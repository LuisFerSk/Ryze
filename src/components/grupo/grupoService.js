import { addDoc, updateDoc, getDocs, deleteDoc } from '../../database/fire'

const collectionName = 'grupo'

export const grupoAdd = async data => {
    return await addDoc(collectionName, data).then(get => get)
}

export const grupoUpdate = async (id, data) => {
    return await updateDoc(collectionName, id, data).then(get => get)
}

export const grupoGetAll = async () => await getDocs(collectionName).then(get => get)

export const grupoDelete = async id => await deleteDoc(collectionName, id).then(get => get)
