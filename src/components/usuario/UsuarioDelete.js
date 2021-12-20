import Delete from '../shared/Delete'
// import { periodoAcademicoServices } from '../../services'

const UsuarioDelete = ({ init, setDocs, closeModal, openAlert }) => {
    const { nombres, apellidos, cedula } = init;

    const onSubmit = () => {

    }

    return (
        <Delete
            value={cedula}
            label='Cedula usuario'
            onSubmitFormik={onSubmit}
            mensajeError={`Digite la cedula del usuario: ${cedula}`}
        >
            Esta seguro de desea eliminar al usuario <strong>{`${nombres} ${apellidos}`}</strong> de cedula: <strong>{cedula}</strong>, si es así escriba la cedula del usuario abajo
        </Delete>
    )
}

export default UsuarioDelete;
