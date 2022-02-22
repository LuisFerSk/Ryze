import { db } from '../firebaseConfig'
import {
    doc,
    query,
    where,
    collection,
    runTransaction,
    setDoc as setDocFire,
    addDoc as addDocFire,
    getDoc as getDocFire,
    getDocs as getDocsFire,
    deleteDoc as deleteDocFire,
    updateDoc as updateDocFire,
} from 'firebase/firestore'

const getDocsSnapshot = (snapshot, result) => {
    snapshot.forEach(get =>
        result = [...result, { id: get.id, data: get.data() }],
    )
}

export const addDoc = (collectionName, data) => {
    return addDocFire(collection(db, collectionName), data)
        .then(result => ({ id: result.id }))
        .catch(error => error)
}

export const setDoc = (collectionName, id, data) => {
    const document = doc(db, collectionName, id)
    return setDocFire(document, data)
        .then(() => ({ id, data }))
        .catch(error => error)
}

export const getDoc = (collectionName, id) => {
    const document = doc(db, collectionName, id)
    return getDocFire(document)
        .then(get => ({ id: get.id, data: get.data() }))
        .catch(error => error)
}

export const getDocs = async collectionName => {
    const result = []
    await getDocsFire(collection(db, collectionName)).then(
        snapshot => {
            getDocsSnapshot(snapshot, result)
        }
    )
    return result;
}

export const getDocWhere = async (collectionName, field, condition, value) => {
    const result = []
    await getDocsFire(query(collection(db, collectionName), where(field, condition, value))).then(
        snapshot => {
            getDocsSnapshot(snapshot, result)
        }
    )
    return result;
}

export const updateDoc = (collectionName, id, data) => {
    const document = doc(db, collectionName, id)
    return updateDocFire(document, data)
        .then(() => true)
        .catch(error => error)
}

export const deleteDoc = (collectionName, id) => {
    const document = doc(db, collectionName, id)
    return deleteDocFire(document)
        .then(() => true)
        .catch(error => error)
}

export const transaction = async (handled) => {
    try {
        await runTransaction(db, handled)
        console.log('Transaction successfully committed!')
    } catch (e) {
        console.log('Transaction failed: ', e)
    }
}
