import editFill from '@iconify/icons-eva/edit-fill'

import { TableCell } from '@material-ui/core'

import Label from '../Label'
import { useFloat } from '../uses'
import Modal from '../shared/Modal'
import UsuarioForm from './UsuarioForm'
import CustomTable from '../shared/Table'
import { ADMINISTRADOR } from '../../_mocks_/roles'
import TableMoreMenu from '../shared/table/TableMoreMenu'
import { mappingMenuItem } from '../shared/table/TableFunctions'
import { getDataForTable, createOptions } from '../../utils/specialFunctions'

const headLabel = [
    { id: 'cedula', label: 'Número de identificación', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'nombres', label: 'Nombres', alignRight: false },
    { id: 'apellidos', label: 'Apellidos', alignRight: false },
    { id: 'roles', label: 'Roles', alignRight: false },
    { id: 'estado', label: 'Estado', alignRight: false },
    { id: '' },
]

const UsuarioTable = ({ docs, setDocs }) => {
    const [isOpenModal, openModal, closeModal, contentModal, setContentModal, titleModal, setTitleModal] = useFloat(false)

    const createTableCells = (row) => {
        const { id, cedula, email, nombres, apellidos, estado, roles } = row;

        const optionUpdateUser = createOptions('Editar', editFill,
            () => {
                setTitleModal('Actualizar periodo academico')
                setContentModal(
                    <UsuarioForm
                        id={id}
                        setDocs={setDocs}
                        init={{ cedula, email, nombres, apellidos, estado, roles }}
                    />
                )
                openModal()
            }
        )

        const options = [optionUpdateUser]

        return (
            <>
                <TableCell align='left'>{cedula}</TableCell>
                <TableCell align='left'>{email}</TableCell>
                <TableCell align='left'>{nombres}</TableCell>
                <TableCell align='left'>{apellidos}</TableCell>
                <TableCell align='left'>{roles.map(row => <ul>{row}</ul>)}</TableCell>
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

    const FilteredData = getDataForTable(docs).filter(row => !row.roles.find(element => element === ADMINISTRADOR))

    return (
        <>
            <CustomTable createTableCells={createTableCells} headLabel={headLabel} data={FilteredData} selectBy='cedula' searchBy='cedula' />
            <Modal title={titleModal} isOpen={isOpenModal} close={closeModal}>
                {contentModal}
            </Modal>
        </>
    )
}

export default UsuarioTable;
