import Delete from "../shared/Delete";
import { periodoAcademicoServices } from "../../services";

const ProfesorDelete = ({ init, setDocs, closeModal, openAlert }) => {
    const { id, nombres, apellidos, cedula } = init;

    const onSubmit = () => {
        periodoAcademicoServices.Delete(id).then(result => {
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
            value={cedula}
            onSubmitFormik={onSubmit}
            label="Cedula profesor"
            mensajeError={`Digite la cedula del profesor: ${cedula}`}
        >
            Esta seguro de desea eliminar al profesor <strong>{`${nombres} ${apellidos}`}</strong> de cedula: <strong>{cedula}</strong>, si es así escriba la cedula del profesor abajo
        </Delete>
    );
};

export default ProfesorDelete;
