import Delete from '../shared/Delete'
import { grupoDelete } from './grupoService'
import { deleteDataInDocumentArray } from '../../utils/specialFunctions'

const GrupoDelete = ({ init, setDocs, closeModal, openAlert }) => {
    const { id, numero, periodo } = init;

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
            value={`${numero}`}
            onSubmitFormik={onSubmit}
            label='Número del grupo'
            mensajeError={`Digite el numero del grupo: ${numero}`}
        >
            Esta seguro de desea eliminar el grupo: <strong>{numero}</strong> del periodo <strong>{periodo}</strong>, si es así escriba el número del grupo
        </Delete>
    )
}

export default GrupoDelete;
