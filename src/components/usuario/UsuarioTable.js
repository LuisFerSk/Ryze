import editFill from '@iconify/icons-eva/edit-fill'
import trash2Outline from '@iconify/icons-eva/trash-2-outline'

import { TableCell } from '@material-ui/core'

import Label from '../Label'
import { useFloat } from '../uses'
import Modal from '../shared/Modal'
import CustomTable from '../shared/Table'
import UsuarioForm from './UsuarioForm'
import UsuarioDelete from './UsuarioDelete'
import FloatAlert from '../shared/FloatAlert'
import TableMoreMenu from '../shared/table/TableMoreMenu'
import { mappingMenuItem } from '../shared/table/TableFunctions'
import { getDataForTable, createOptions } from '../../utils/specialFunctions'

const headLabel = [
    { id: 'cedula', label: 'Número de identificación', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'nombres', label: 'Nombres', alignRight: false },
    { id: 'apellidos', label: 'Apellidos', alignRight: false },
    { id: 'estado', label: 'Estado', alignRight: false },
    { id: '' },
]

const UsuarioTable = ({ docs, setDocs }) => {
    const [isOpenModal, openModal, closeModal, contentModal, setContentModal, titleModal, setTitleModal] = useFloat(false)

    const [isOpenAlert, openAlert, closeAlert, contentAlert] = useFloat(
        false,
        '¡Se ha eliminado correctamente el usuario!'
    )

    const cells = (row) => {
        const { id, cedula, email, nombres, apellidos, estado } = row;

        const options = [
            createOptions('Editar', editFill, () => {
                setTitleModal('Actualizar periodo academico')
                setContentModal(
                    <UsuarioForm
                        id={id}
                        setDocs={setDocs}
                        init={{ cedula, email, nombres, apellidos, estado }}
                    />
                )
                openModal()
            }),
            createOptions('Eliminar', trash2Outline, () => {
                setTitleModal('Eliminar periodo academico')
                setContentModal(
                    <UsuarioDelete
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
                <TableCell align='left'>{cedula}</TableCell>
                <TableCell align='left'>{email}</TableCell>
                <TableCell align='left'>{nombres}</TableCell>
                <TableCell align='left'>{apellidos}</TableCell>
                <TableCell align='left'>
                    <Label
                        variant='ghost'
                        color={(estado === true && 'success') || 'error'}
                    >
                        {estado === true ? 'Activo' : 'Inactivo'}
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
            <CustomTable cells={cells} headLabel={headLabel} data={getDataForTable(docs)} selectBy='cedula' searchBy='cedula' />
            <Modal title={titleModal} isOpen={isOpenModal} close={closeModal}>
                {contentModal}
            </Modal>
            <FloatAlert isOpen={isOpenAlert} close={closeAlert}>
                {contentAlert}
            </FloatAlert>
        </>
    )
}

export default UsuarioTable;
