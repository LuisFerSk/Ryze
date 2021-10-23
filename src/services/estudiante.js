import database from "../database/fire";

const collectionName = "estudiante";

const estudiante = {
    Add: async data => {
        return await database.AddDoc(collectionName, data).then(get => get);
    },

    Update: async (id, data) => {
        return await database.UpdateDoc(collectionName, id, data).then(get => get)
    },

    Get: async () => await database.GetDocs(collectionName).then(get => get),

    Delete: async id => await database.DeleteDoc(collectionName, id).then(get => get)
};

export default estudiante;
