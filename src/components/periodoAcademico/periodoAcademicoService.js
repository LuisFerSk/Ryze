import { addDoc, updateDoc, getDocs, deleteDoc } from '../../database/fire'

const collectionName = 'periodo_academico'

export const periodoAcademicoAdd = async data => {
    return await addDoc(collectionName, data).then(get => get)
}

export const periodoAcademicoUpdate = async (id, data) => {
    return await updateDoc(collectionName, id, data).then(get => get)
}

export const periodoAcademicoGetAll = async () => await getDocs(collectionName).then(get => get)

export const periodoAcademicoDelete = async id => await deleteDoc(collectionName, id).then(get => get)
