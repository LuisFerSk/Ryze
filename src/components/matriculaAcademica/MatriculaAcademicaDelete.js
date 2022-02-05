import Delete from '../shared/Delete'
import { matriculaAcademicaDelete } from './matriculaAcademicaService'
import { deleteDataInDocumentArray } from '../../utils/specialFunctions'

const MatriculaAcademicaDelete = ({ init, setDocs, closeModal, openAlert }) => {
    const { id, grupo, estudiante } = init;

    const onSubmit = () => {
        matriculaAcademicaDelete(id).then(result => {
            if (result === true) {
                setDocs(oldDocs => deleteDataInDocumentArray(oldDocs, id))
                openAlert()
                closeModal()
                return;
            }
            console.log(result)
        })
    }

    return (
        <Delete
            onSubmitFormik={onSubmit}
            value={estudiante.toString()}
            label='Identificación del estudiante'
            mensajeError={`Digite la identificicación: ${estudiante}`}
        >
            Esta seguro de desea cancelar la materia: <strong>{grupo}</strong> del estudiante con identificiación <strong>{estudiante}</strong>, si es así escriba la identificación del estudiante
        </Delete>
    )
}

export default MatriculaAcademicaDelete;
