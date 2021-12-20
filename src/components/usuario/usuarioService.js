import { addDoc, updateDoc, getDocs, deleteDoc } from '../../database/fire'

const collectionName = 'users'

const usuario = {
	Add: async data => {
		return addDoc(collectionName, data).then(get => get)
	},

	Update: async (id, data) => {
		return await updateDoc(collectionName, id, data).then(get => get)
	},

	Get: async () => await getDocs(collectionName).then(get => get),

	Delete: async id => await deleteDoc(collectionName, id).then(get => get)
}

export default usuario;
