import fire from "../config/firebase";
import "firebase/storage";
import { v4 } from "uuid";

const stg = () => {
	const obj = {};

	obj.putFile = async (File, folder) => {
		let result;

		const filePATH = `${folder}/${v4()}#${File.name}`;

		const reference = fire.storage().ref(filePATH);

		const promises = [
			await reference.put(File),
			await reference.getDownloadURL().then((get) => (result = get)),
		];

		await Promise.all(promises);

		return result;
	};

	obj.deleteFile = async (fielPATH) => {
		const reference = fire.storage().refFromURL(fielPATH);

		return await reference
			.delete()
			.then(() => {
				return true;
			})
			.catch((error) => {
				return error.a;
			});
	};

	return obj;
};

export default stg;
