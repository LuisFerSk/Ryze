import editFill from '@iconify/icons-eva/edit-fill'
import trash2Outline from '@iconify/icons-eva/trash-2-outline'
import { TableCell } from '@material-ui/core'

import { useFloat } from '../uses'
import TableMoreMenu from '../shared/table/TableMoreMenu'
import MatriculaAcademicaForm from './MatriculaAcademicaForm'
import { mappingMenuItem } from '../shared/table/TableFunctions'
import MatriculaAcademicaDelete from './MatriculaAcademicaDelete'
import { Modal, CustomTable, FloatAlert, Undefined } from '../shared'
import { getDataForTable, createOptions } from '../../utils/specialFunctions'

const headLabel = [
    {
        id: 'grupo',
        label: 'Grupo',
        alignRight: false
    },
    {
        id: 'estudiante',
        label: 'Estudiante',
        alignRight: false
    },
    {
        id: '',
    },
]

const MatriculaAcedemicaTable = ({ docs, setDocs }) => {
    const [isOpenModal, openModal, closeModal, contentModal, setContentModal, titleModal, setTitleModal] = useFloat(false)

    const [isOpenAlert, openAlert, closeAlert, contentAlert] = useFloat(
        false,
        '¡Se ha eliminado correctamente el periodo academico!'
    )

    const createTableCells = row => {
        const { id, grupo, estudiante } = row;

        const updateMatriculaAcademica = createOptions('Editar', editFill, () => {
            setTitleModal('Cambiar grupo')
            setContentModal(
                <MatriculaAcademicaForm
                    id={id}
                    setDocs={setDocs}
                    init={{ grupo, estudiante }}
                />
            )
            openModal()
        })

        const deleteMatriculaAcademica = createOptions('Eliminar', trash2Outline, () => {
            setTitleModal('Cancelar materia')
            setContentModal(
                <MatriculaAcademicaDelete
                    init={row}
                    setDocs={setDocs}
                    openAlert={openAlert}
                    closeModal={closeModal}
                />
            )
            openModal()
        })

        const options = [updateMatriculaAcademica, deleteMatriculaAcademica,]

        return (
            <>
                <TableCell align='left'>
                    {grupo ? grupo : <Undefined />}
                </TableCell>
                <TableCell align='left'>
                    {estudiante ? estudiante : <Undefined />}
                </TableCell>
                <TableCell padding='checkbox'>
                    <TableMoreMenu>
                        {mappingMenuItem(options)}
                    </TableMoreMenu>
                </TableCell>
            </>
        )
    }

    return (
        <>
            <CustomTable createTableCells={createTableCells} headLabel={headLabel} data={getDataForTable(docs)} selectBy='numero' searchBy='numero' />
            <Modal title={titleModal} isOpen={isOpenModal} close={closeModal}>
                {contentModal}
            </Modal>
            <FloatAlert isOpen={isOpenAlert} close={closeAlert}>
                {contentAlert}
            </FloatAlert>
        </>
    )
}

export default MatriculaAcedemicaTable;
