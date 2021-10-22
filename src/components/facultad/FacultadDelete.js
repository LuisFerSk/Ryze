import Delete from "../shared/Delete";
import { facultadServices } from "../../services";

const FacultadDelete = ({ init, setDocs, closeModal, openAlert }) => {
    const { id, titulo } = init;

    const onSubmit = () => {
        facultadServices.Delete(id).then(result => {
            if (result === true) {
                setDocs(old => old.filter(row => row.id !== id));
                openAlert();
                closeModal();
            } else {
                console.log(result);
            }
        });
    }

    return (
        <Delete
            value={titulo}
            label="Facultad"
            onSubmitFormik={onSubmit}
            mensajeError={`Digite el título de la facultad: ${titulo}`}
        >
            Esta seguro de desea eliminar la facultad nombrado como: <strong>{titulo}</strong>, si es así escriba el nombre la facultad abajo
        </Delete>
    );
};

export default FacultadDelete;
