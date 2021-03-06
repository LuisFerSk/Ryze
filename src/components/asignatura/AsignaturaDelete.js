import Delete from '../shared/Delete'
import { asignaturaDelete } from './asignaturaService'
import { deleteDataInDocumentArray } from '../../utils/specialFunctions'

const AsignaturaDelete = ({ init, setDocs, closeModal, openAlert }) => {
    const { id, codigo } = init;
    return (
        <Delete
            value={codigo}
            label='Asignatura'
            mensajeError={`Digite el codigo de la asignatura: ${codigo}`}
            onSubmitFormik={() => {
                asignaturaDelete(id).then(result => {
                    if (result === true) {
                        setDocs(old => deleteDataInDocumentArray(old, id))
                        openAlert()
                        closeModal()
                        return;
                    }
                    console.log(result)
                })
            }}
        >
            Esta seguro de desea eliminar la asignatura con codigo: <strong>{codigo}</strong>, si es así escriba el codigo de la asignatura abajo
        </Delete>
    )
}

export default AsignaturaDelete;
