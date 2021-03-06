import Delete from '../shared/Delete'
import { periodoAcademicoDelete } from './periodoAcademicoService'
import { deleteDataInDocumentArray } from '../../utils/specialFunctions'

const PeriodoAcademicoDelete = ({ init, setDocs, closeModal, openAlert }) => {
    const { id, titulo } = init;

    const onSubmit = () => {
        periodoAcademicoDelete(id).then(result => {
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

export default PeriodoAcademicoDelete;
