import editFill from '@iconify/icons-eva/edit-fill'
import trash2Outline from '@iconify/icons-eva/trash-2-outline'

import { TableCell } from '@material-ui/core'

import Label from '../Label'
import { useFloat } from '../uses'
import Modal from '../shared/Modal'
import CustomTable from '../shared/Table'
import FloatAlert from '../shared/FloatAlert'
import TableMoreMenu from '../shared/table/TableMoreMenu'
import PeriodoAcademicoForm from './PeriodoAcademicoForm'
import PeriodoAcademicoDelete from './PeriodoAcademicoDelete'
import { mappingMenuItem } from '../shared/table/TableFunctions'
import { getDataForTable, createOptions } from '../../utils/specialFunctions'


const headLabel = [
    { id: 'titulo', label: 'Periodo', alignRight: false },
    { id: 'fechaInicio', label: 'Fecha de inicio', alignRight: false },
    { id: 'fechaFin', label: 'Fecha de finalización', alignRight: false },
    { id: 'estado', label: 'Estado', alignRight: false, },
    { id: '' }
]

const PeriodoAcademicoTable = ({ docs, setDocs }) => {
    const [isOpenModal, openModal, closeModal, contentModal, setContentModal, titleModal, setTitleModal] = useFloat(false)

    const [isOpenAlert, openAlert, closeAlert, contentAlert] = useFloat(
        false,
        '¡Se ha eliminado correctamente el periodo academico!'
    )

    const createTableCells = (row) => {
        const { id, titulo, estado, fechaInicio, fechaFin } = row;

        const options = [
            createOptions('Editar', editFill, () => {
                setTitleModal('Actualizar periodo academico')
                setContentModal(
                    <PeriodoAcademicoForm
                        id={id}
                        setDocs={setDocs}
                        init={{ titulo, estado, fechaInicio, fechaFin }}
                    />
                )
                openModal()
            }),
            createOptions('Eliminar', trash2Outline, () => {
                setTitleModal('Eliminar periodo academico')
                setContentModal(
                    <PeriodoAcademicoDelete
                        init={row}
                        setDocs={setDocs}
                        openAlert={openAlert}
                        closeModal={closeModal}
                    />
                )
                openModal()
            }),
        ]

        return (
            <>
                <TableCell align='left'>{titulo}</TableCell>
                <TableCell align='left'>{fechaInicio}</TableCell>
                <TableCell align='left'>{fechaFin}</TableCell>
                <TableCell align='left'>
                    <Label
                        variant='ghost'
                        color={(estado === true && 'success') || 'error'}
                    >
                        {estado === true ? 'Abierto' : 'Cerrado'}
                    </Label>
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
            <CustomTable createTableCells={createTableCells} headLabel={headLabel} data={getDataForTable(docs)} selectBy='titulo' searchBy='titulo' />
            <Modal title={titleModal} isOpen={isOpenModal} close={closeModal}>
                {contentModal}
            </Modal>
            <FloatAlert isOpen={isOpenAlert} close={closeAlert}>
                {contentAlert}
            </FloatAlert>
        </>
    )
}

export default PeriodoAcademicoTable;
