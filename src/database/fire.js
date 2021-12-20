import { db } from '../firebaseConfig'
import {
	doc,
	collection,
	runTransaction,
	addDoc as addDocFire,
	getDocs as getDocsFire,
	deleteDoc as deleteDocFire,
	updateDoc as updateDocFire,
} from 'firebase/firestore'

export const addDoc = async (collectionName, data) =>
	await addDocFire(collection(db, collectionName), data)
		.then(result => result)
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
