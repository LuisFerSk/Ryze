import editFill from '@iconify/icons-eva/edit-fill'
import { TableCell } from '@material-ui/core'

import Label from '../Label'
import { useFloat } from '../uses'
import UsuarioForm from './UsuarioForm'
import { getDataForTable } from '../../utils/specialFunctions'
import { CustomTable, Modal, Undefined, IconButton } from '../shared'

const headLabel = [
    { id: 'identificacion', label: 'Número de identificación', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'nombres', label: 'Nombres', alignRight: false },
    { id: 'apellidos', label: 'Apellidos', alignRight: false },
    { id: 'roles', label: 'Tipo de usuario', alignRight: false },
    { id: 'estado', label: 'Estado', alignRight: false },
    { id: '' },
]

const UsuarioTable = ({ docs, setDocs }) => {
    const [isOpenModal, openModal, closeModal, contentModal, setContentModal, titleModal, setTitleModal] = useFloat(false)

    const createTableCells = (row) => {
        const { id, identificacion, email, nombres, apellidos, estado, tipo } = row;

        const updateUser = () => {
            setTitleModal('Actualizar usuario')
            setContentModal(
                <UsuarioForm
                    id={id}
                    setDocs={setDocs}
                    init={{ identificacion, email, nombres, apellidos, estado, tipo }}
                />
            )
            openModal()
        }


        return (
            <>
                <TableCell align='left'>{identificacion ? identificacion : <Undefined />}</TableCell>
                <TableCell align='left'>{email ? email : <Undefined />}</TableCell>
                <TableCell align='left'>{nombres ? nombres : <Undefined />}</TableCell>
                <TableCell align='left'>{apellidos ? apellidos : <Undefined />}</TableCell>
                <TableCell align='left'>{tipo ? tipo : <Undefined />}</TableCell>
                <TableCell align='left'>
                    <Label
                        variant='ghost'
                        color={(estado === true && 'success') || 'error'}
                    >
                        {estado === true ? 'Activo' : 'Inactivo'}
                    </Label>
                </TableCell>
                <TableCell padding='checkbox'>
                    <IconButton onClick={updateUser} title='editar usuario' icon={editFill} />
                </TableCell>
            </>
        )
    }

    return (
        <>
            <CustomTable createTableCells={createTableCells} headLabel={headLabel} data={getDataForTable(docs)} selectBy='identificacion' searchBy='identificacion' />
            <Modal title={titleModal} isOpen={isOpenModal} close={closeModal}>
                {contentModal}
            </Modal>
        </>
    )
}

export default UsuarioTable;
