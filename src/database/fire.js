import { db } from "../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const database = {
	AddDoc: async (collectionName, data) => {
		return await addDoc(collection(db, collectionName), data)
			.then((result) => result)
			.catch((error) => error);
	},

	GetDocs: async (collectionName) => {
		const result = [];
		await getDocs(collection(db, collectionName)).then((snapshot) =>
			snapshot.forEach((doc) =>
				result.push({ id: doc.id, data: doc.data() }),
			),
		);
		return result;
	},
};

export default database;
