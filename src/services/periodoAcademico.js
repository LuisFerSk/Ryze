import db from "../database/fire";

const obj = {};

const database = db();

const collectionName = "periodo_academico";

const periodoAcademico = () => {
    obj.OnSnapshotAll = (set) => {
        return database.OnSnapshotDocs(collectionName, set);
    };

    obj.Add = async (data) => {
        let result;

        await database.AddDoc(collectionName, data).then((get) => (result = get));

        return result;
    };

    obj.Update = async (id, data) => {
        let result;

        await database
            .UpdateDoc(collectionName, id, data)
            .then((get) => (result = get));

        return result;
    };

    obj.Delete = async (id) => {
        let result;

        await database.DeleteDoc(collectionName, id).then((get) => (result = get));

        return result;
    };

    return obj;
};

export default periodoAcademico;
