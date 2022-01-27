import Delete from '../shared/Delete'
import { grupoDelete } from './grupoService'
import { deleteDataInDocumentArray } from '../../utils/specialFunctions'

const GrupoDelete = ({ init, setDocs, closeModal, openAlert }) => {
    const { id, titulo } = init;

    const onSubmit = () => {
        grupoDelete(id).then(result => {
            if (result === true) {
                setDocs(old => deleteDataInDocumentArray(old))
                openAlert()
                closeModal()
                return;
            }
            console.log(result)
        })
    }

    return (
        <Delete
            value={titulo}
            onSubmitFormik={onSubmit}
            label='Periodo academico'
            mensajeError={`Digite el título del periodo academico: ${titulo}`}
        >
            Esta seguro de desea eliminar el periodo academico nombrado como: <strong>{titulo}</strong>, si es así escriba el nombre del periodo abajo
        </Delete>
    )
}

export default GrupoDelete;
