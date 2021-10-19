import { db } from "../config/firebase";
import {
	doc,
	addDoc,
	getDocs,
	updateDoc,
	deleteDoc,
	collection,
} from "firebase/firestore";

const database = {
	AddDoc: async (collectionName, data) =>
		await addDoc(collection(db, collectionName), data)
			.then(result => result)
			.catch(error => error),

	GetDocs: async collectionName => {
		const result = [];
		await getDocs(collection(db, collectionName)).then(snapshot =>
			snapshot.forEach(doc =>
				result.push({ id: doc.id, data: doc.data() }),
			),
		);
		return result;
	},

	UpdateDoc: async (collectionName, id, data) =>
		await updateDoc(doc(db, collectionName, id), data)
			.then(() => true)
			.catch(error => error),

	DeleteDoc: async (collectionName, id) =>
		await deleteDoc(doc(db, collectionName, id))
			.then(() => true)
			.catch(error => error),

};

export default database;
