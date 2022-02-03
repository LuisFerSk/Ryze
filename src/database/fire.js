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

export const addDoc = async (collectionName, data) =>
    await addDocFire(collection(db, collectionName), data)
        .then(result => result)
        .catch(error => error)

export const setDoc = async (collectionName, id, data) =>
    await setDocFire(doc(db, collectionName, id), data)
        .then(() => ({ id, data }))
        .catch(error => error)

export const getDoc = async (collection, id) =>
    await getDocFire(doc(db, collection, id))
        .then(doc => {
            if (doc.data()) {
                return { id: doc.id, data: doc.data() }
            }
        })
        .catch(error => error)

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

export const updateDoc = async (collectionName, id, data) =>
    await updateDocFire(doc(db, collectionName, id), data)
        .then(() => true)
        .catch(error => error)

export const deleteDoc = async (collectionName, id) =>
    await deleteDocFire(doc(db, collectionName, id))
        .then(() => true)
        .catch(error => error)

export const transaction = async (handler) => {
    try {
        await runTransaction(db, handler)
        console.log('Transaction successfully committed!')
    } catch (e) {
        console.log('Transaction failed: ', e)
    }
}
