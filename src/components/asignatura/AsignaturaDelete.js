import Delete from "../shared/Delete";
import { periodoAcademicoServices } from "../../services";

const PeriodoAcademicoDelete = ({ init, setDocs, closeModal, openAlert }) => {
    const { id, codigo } = init;

    return (
        <Delete
            value={codigo}
            label="Asignatura"
            mensajeError={`Digite el codigo de la asignatura: ${codigo}`}
            onSubmitFormik={() => {
                periodoAcademicoServices.Delete(id).then(result => {
                    if (result === true) {
                        setDocs(old => old.filter(row => row.id !== id));
                        openAlert();
                        closeModal();
                    } else {
                        console.log(result);
                    }
                });
            }}
        >
            Esta seguro de desea eliminar la asignatura con codigo: <strong>{codigo}</strong>, si es así escriba el codigo de la asignatura abajo
        </Delete>
    );
};

export default PeriodoAcademicoDelete;
