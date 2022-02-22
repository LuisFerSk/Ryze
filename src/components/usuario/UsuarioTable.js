import editFill from '@iconify/icons-eva/edit-fill'
import { TableCell } from '@material-ui/core'

import Label from '../Label'
import { useFloat } from '../uses'
import UsuarioForm from './UsuarioForm'
import { getDataForTable } from '../../utils/specialFunctions'

import {
    Modal,
    Undefined,
    IconButton,
    CustomTable,
} from '../shared'

const headLabel = [
    {
        id: 'identificacion',
        label: 'Número de identificación',
        alignRight: false,
    },
    {
        id: 'email',
        label: 'Email',
        alignRight: false,
    },
    {
        id: 'nombres',
        label: 'Nombres',
        alignRight: false,
    },
    {
        id: 'apellidos',
        label: 'Apellidos',
        alignRight: false,
    },
    {
        id: 'roles',
        label: 'Tipo de usuario',
        alignRight: false,
    },
    {
        id: 'estado',
        label: 'Estado',
        alignRight: false,
    },
    {
        id: ''
    },
]

const UsuarioTable = ({ docs, setDocs }) => {
    const [
        openModal,
        closeModal,
        titleModal,
        isOpenModal,
        contentModal,
        setTitleModal,
        setContentModal,
    ] = useFloat(false)

    const createTableCells = (row) => {
        const {
            id,
            tipo,
            email,
            estado,
            nombres,
            apellidos,
            identificacion,
        } = row;

        const updateUser = () => {
            setTitleModal('Actualizar usuario')
            setContentModal(
                <UsuarioForm
                    id={id}
                    setDocs={setDocs}
                    init={{
                        tipo,
                        email,
                        estado,
                        nombres,
                        apellidos,
                        identificacion,
                    }}
                />
            )
            openModal()
        }


        return (
            <>
                <TableCell align='left'>
                    {identificacion ? identificacion : <Undefined />}
                </TableCell>
                <TableCell align='left'>
                    {email ? email : <Undefined />}
                </TableCell>
                <TableCell align='left'>
                    {nombres ? nombres : <Undefined />}
                </TableCell>
                <TableCell align='left'>
                    {apellidos ? apellidos : <Undefined />}
                </TableCell>
                <TableCell align='left'>
                    {tipo ? tipo : <Undefined />}
                </TableCell>
                <TableCell align='left'>
                    <Label
                        variant='ghost'
                        color={estado === true ? 'success' : 'error'}
                    >
                        {estado === true ? 'Activo' : 'Inactivo'}
                    </Label>
                </TableCell>
                <TableCell padding='checkbox'>
                    <IconButton
                        icon={editFill}
                        onClick={updateUser}
                        title='editar usuario'
                    />
                </TableCell>
            </>
        )
    }

    return (
        <>
            <CustomTable
                headLabel={headLabel}
                data={getDataForTable(docs)}
                createTableCells={createTableCells}
                earchBy='identificacion'
                selectBy='identificacion'
            />
            <Modal
                title={titleModal}
                isOpen={isOpenModal}
                close={closeModal}
            >
                {contentModal}
            </Modal>
        </>
    )
}

export default UsuarioTable;
