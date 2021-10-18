import database from "../database/fire";

const collectionName = "periodo_academico";

const periodoAcademico = {
    Add: async (data) => {
        return await database.AddDoc(collectionName, data).then((get) => get);
    },

    Get: async () => {
        return await database.GetDocs(collectionName).then((get) => get)
    }

    // OnSnapshotAll: (set) => {
    //     return db.OnSnapshotDocs(collectionName, set);
    // },



    // obj.Update = async (id, data) => {
    //     let result;

    //     await db
    //         .UpdateDoc(collectionName, id, data)
    //         .then((get) => (result = get));

    //     return result;
    // };

    // obj.Delete = async (id) => {
    //     let result;

    //     await db.DeleteDoc(collectionName, id).then((get) => (result = get));

    //     return result;
    // };
};

export default periodoAcademico;
