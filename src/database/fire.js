import fire from "../config/firebase";
import "firebase/firestore";

const db = () => {
	const obj = {};

	obj.GetDocs = async (collectionName) => {
		const result = [];

		await fire
			.firestore()
			.collection(collectionName)
			.get()
			.then((snapshot) =>
				snapshot.forEach((doc) =>
					result.push({ id: doc.id, data: doc.data() }),
				),
			);

		return result;
	};

	obj.GetDoc = async (collectionName, id) => {
		let result;

		await fire
			.firestore()
			.collection(collectionName)
			.doc(id)
			.get()
			.then(
				(snapshot) => (result = { id: snapshot.id, data: snapshot.data() }),
			);

		return result;
	};

	obj.OnSnapshotDocs = (collectionName, set = (e) => e) => {
		let docs;

		fire
			.firestore()
			.collection(collectionName)
			.onSnapshot((query) => {
				docs = query.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}));
				docs = set(docs);
			});

		return docs;
	};

	obj.OnSnapshotDocsOneField = (collectionName, set, nameField) => {
		return fire
			.firestore()
			.collection(collectionName)
			.onSnapshot((query) => {
				const docs = query.docs.map((doc) => doc.data()[nameField]);
				set(docs);
			});
	};

	obj.OnSnapshotReference = (reference) => {
		let result;

		const unsubscribe = reference.onSnapshot(
			(doc) => (result = { id: doc.id, data: doc.data() }),
		);
		unsubscribe();

		return result;
	};

	obj.GetReference = async (reference) => {
		let result;

		await reference
			.get()
			.then((doc) => (result = { id: doc.id, data: doc.data() }));

		return result;
	};

	obj.GetReferences = async (references) => {
		const result = [];

		await references.forEach((reference) =>
			reference
				.get()
				.then((doc) => result.push({ id: doc.id, data: doc.data() })),
		);

		return result;
	};

	obj.AddDoc = async (collectionName, data) => {
		return await fire
			.firestore()
			.collection(collectionName)
			.doc()
			.set(data)
			.then(() => {
				return true;
			})
			.catch((error) => {
				return error.a;
			});
	};

	obj.MergeField = async (collectionName, idDoc, field, value) => {
		return await fire
			.firestore()
			.collection(collectionName)
			.doc(idDoc)
			.set(
				{
					[field]: value,
				},
				{ merge: true },
			)
			.then(() => {
				return true;
			})
			.catch((error) => {
				return error.a;
			});
	};

	obj.UpdateDoc = async (collectionName, idDoc, data) => {
		return await fire
			.firestore()
			.collection(collectionName)
			.doc(idDoc)
			.update(data)
			.then(() => {
				return true;
			})
			.catch((error) => {
				return error.a;
			});
	};

	obj.DeleteDoc = async (collectionName, idDoc) => {
		return await fire
			.firestore()
			.collection(collectionName)
			.doc(idDoc)
			.delete()
			.then(() => {
				return true;
			})
			.catch((error) => {
				return error.a;
			});
	};

	obj.Collection = (collectionName) => {
		return fire.firestore().collection(collectionName);
	};

	obj.OnSnapshotWhere = (
		collectionName,
		set = (e) => e,
		field,
		condition,
		value,
	) => {
		let docs;

		fire
			.firestore()
			.collection(collectionName)
			.where(field, condition, value)
			.onSnapshot((query) => {
				docs = query.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}));
				docs = set(docs);
			});

		return docs;
	};

	return obj;
};
export default db;
