import { TableCell } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import clipboardText from '@iconify/icons-mdi/clipboard-text'

import { CustomTable, Undefined, IconButton } from '../shared'
import { getDataForTable } from '../../utils/specialFunctions'

const headLabel = [
    { id: 'asignatura', label: 'Asignatura', alignRight: false },
    { id: 'numero', label: 'Grupo', alignRight: false },
    { id: '', },
]

const AsistenciaTable = ({ docs, setDocs }) => {
    const navigate = useNavigate()

    const createTableCells = row => {
        const { numero, asignatura } = row;

        const openAsistenciaGrupo = () => {
            navigate(`/dashboard/asistencia/${asignatura}-${numero}`, { replace: true })
        }

        return (
            <>
                <TableCell align='left'>{asignatura ? asignatura : <Undefined />}</TableCell>
                <TableCell align='left'>{numero ? numero : <Undefined />}</TableCell>
                <TableCell padding='checkbox'>
                    <IconButton icon={clipboardText} onClick={openAsistenciaGrupo} title='asistencia' />
                </TableCell>
            </>
        )
    }

    return (
        <CustomTable createTableCells={createTableCells} headLabel={headLabel} data={getDataForTable(docs)} selectBy='asignatura' searchBy='asignatura' />
    )
}

export default AsistenciaTable;
