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

export const addDoc = async (collectionName, data) => {
    return await addDocFire(collection(db, collectionName), data)
        .then(result => ({ id: result.id }))
        .catch(error => error)
}

export const setDoc = async (collectionName, id, data) => {
    const document = doc(db, collectionName, id)
    return await setDocFire(document, data)
        .then(() => ({ id, data }))
        .catch(error => error)
}

export const getDoc = async (collection, id) => {
    const document = doc(db, collection, id)
    return await getDocFire(document)
        .then(doc => ({ id: doc.id, data: doc.data() }))
        .catch(error => error)
}

export const getDocs = async collectionName => {
    const result = []
    await getDocsFire(collection(db, collectionName)).then(snapshot =>
        snapshot.forEach(doc =>
            result.push({ id: doc.id, data: doc.data() }),
        ),
    )
    return result;
}

export const getDocWhere = async (collectionName, field, condition, value) => {
    const result = []
    await getDocsFire(query(collection(db, collectionName), where(field, condition, value))).then(snapshot =>
        snapshot.forEach(doc =>
            result.push({ id: doc.id, data: doc.data() }),
        ),
    )
    return result;
}

export const updateDoc = async (collectionName, id, data) => {
    const document = doc(db, collectionName, id)
    return await updateDocFire(document, data)
        .then(() => true)
        .catch(error => error)
}

export const deleteDoc = async (collectionName, id) => {
    const document = doc(db, collectionName, id)
    return await deleteDocFire(document)
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
