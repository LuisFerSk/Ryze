import Delete from '../shared/Delete'
// import { periodoAcademicoServices } from '../../services'

const UsuarioDelete = ({ init, setDocs, closeModal, openAlert }) => {
    const { nombres, apellidos, identificacion } = init;

    const onSubmit = () => {

    }

    return (
        <Delete
            value={identificacion}
            label='Identificación usuario'
            onSubmitFormik={onSubmit}
            mensajeError={`Digite la identificacion del usuario: ${identificacion}`}
        >
            Esta seguro de desea eliminar al usuario <strong>{`${nombres} ${apellidos}`}</strong> de identificacion: <strong>{identificacion}</strong>, si es así escriba la identificacion del usuario abajo
        </Delete>
    )
}

export default UsuarioDelete;
