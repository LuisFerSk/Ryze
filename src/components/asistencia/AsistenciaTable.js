import editFill from '@iconify/icons-eva/edit-fill'
import { TableCell } from '@material-ui/core'

import { useFloat } from '../uses'
import AsistenciaForm from './AsistenciaForm'
import TableMoreMenu from '../shared/table/TableMoreMenu'
import { Modal, CustomTable, Undefined } from '../shared'
import { mappingMenuItem } from '../shared/table/TableFunctions'
import { getDataForTable, createOptions } from '../../utils/specialFunctions'

const headLabel = [
    { id: 'asignatura', label: 'Asignatura', alignRight: false },
    { id: 'numero', label: 'Grupo', alignRight: false },
    { id: '', },
]

const AsistenciaTable = ({ docs, setDocs }) => {
    const [isOpenModal, openModal, closeModal, contentModal, setContentModal, titleModal, setTitleModal] = useFloat(false)

    const createTableCells = row => {
        const { id, numero, asignatura, profesor, periodo } = row;

        const addAsistencia = createOptions('Asistencia', editFill, () => {
            setTitleModal('Registrar asistencia')
            setContentModal(
                <AsistenciaForm
                    id={id}
                    setDocs={setDocs}
                    init={{ numero, asignatura, profesor, periodo }}
                />
            )
            openModal()
        })

        const options = [addAsistencia,]

        return (
            <>
                <TableCell align='left'>{asignatura ? asignatura : <Undefined />}</TableCell>
                <TableCell align='left'>{numero ? numero : <Undefined />}</TableCell>
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
        </>
    )
}

export default AsistenciaTable;
