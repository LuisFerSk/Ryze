import { addDoc, updateDoc, getDocs, deleteDoc } from "../database/fire";
import { serverTimestamp } from "firebase/firestore";

const collectionName = "users";

const user = {
    Add: async data => {
        return await addDoc(collectionName, { ...data, createTimestamp: serverTimestamp() }).then(get => get);
    },

    Update: async (id, data) => {
        return await updateDoc(collectionName, id, { ...data, updateTimestamp: serverTimestamp() }).then(get => get)
    },

    Get: async () => await getDocs(collectionName).then(get => get),

    Delete: async id => await deleteDoc(collectionName, id).then(get => get)
};

export default user;
