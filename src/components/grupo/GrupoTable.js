import editFill from '@iconify/icons-eva/edit-fill'
import trash2Outline from '@iconify/icons-eva/trash-2-outline'
import { TableCell } from '@material-ui/core'

import { useFloat } from '../uses'
import GrupoForm from './GrupoForm'
import GrupoDelete from './GrupoDelete'
import TableMoreMenu from '../shared/table/TableMoreMenu'
import { Modal, CustomTable, FloatAlert, Undefined } from '../shared'
import { mappingMenuItem } from '../shared/table/TableFunctions'
import { getDataForTable, createOptions } from '../../utils/specialFunctions'

const headLabel = [
    { id: 'numero', label: 'Grupo', alignRight: false },
    { id: 'asignatura', label: 'Asignatura', alignRight: false },
    { id: 'profesor', label: 'Usuario', alignRight: false },
    { id: 'periodo', label: 'Periodo', alignRight: false },
    { id: '', },
]

const GrupoTable = ({ docs, setDocs }) => {
    const [isOpenModal, openModal, closeModal, contentModal, setContentModal, titleModal, setTitleModal] = useFloat(false)

    const [isOpenAlert, openAlert, closeAlert, contentAlert] = useFloat(
        false,
        '¡Se ha eliminado correctamente el periodo academico!'
    )

    const createTableCells = row => {
        const { id, numero, asignatura, profesor, periodo } = row;

        const updateGrupo = createOptions('Editar', editFill, () => {
            setTitleModal('Actualizar grupo')
            setContentModal(
                <GrupoForm
                    id={id}
                    setDocs={setDocs}
                    init={{ numero, asignatura, profesor, periodo }}
                />
            )
            openModal()
        })

        const deleteGrupo = createOptions('Eliminar', trash2Outline, () => {
            setTitleModal('Eliminar grupo')
            setContentModal(
                <GrupoDelete
                    init={row}
                    setDocs={setDocs}
                    openAlert={openAlert}
                    closeModal={closeModal}
                />
            )
            openModal()
        })

        const options = [updateGrupo, deleteGrupo,]

        return (
            <>
                <TableCell align='left'>{numero ? numero : <Undefined />}</TableCell>
                <TableCell align='left'>{asignatura ? asignatura : <Undefined />}</TableCell>
                <TableCell align='left'>{profesor ? profesor : <Undefined />}</TableCell>
                <TableCell align='left'>{periodo ? periodo : <Undefined />}</TableCell>
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

export default GrupoTable;
