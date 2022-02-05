import { useState } from 'react'
import { TableCell } from '@material-ui/core'
import clipboardText from '@iconify/icons-mdi/clipboard-text'

import TableListToolbar from '../shared/table/TableListToolbar'
import { CustomTable, Undefined, IconButton } from '../shared'
import { getDataForTable } from '../../utils/specialFunctions'

const headLabel = [
    { id: 'estudiante', label: 'Estudiante', alignRight: false },
    { id: '', },
]

const AsistenciaTable = ({ docs, setDocs }) => {
    const [filter, setFilter] = useState()

    const filters = [
        <TableListToolbar
            filter={filter}
            type='date'
            onFilter={(event) => {
                setFilter(event.target.value)
            }}
        />
    ]

    const createTableCells = row => {
        const { estudiante } = row;

        return (
            <>
                <TableCell align='left'>{estudiante ? estudiante : <Undefined />}</TableCell>
                <TableCell padding='checkbox'>
                    <IconButton icon={clipboardText} title='asistencia' />
                </TableCell>
            </>
        )
    }

    return (
        <>
            <CustomTable filters={filters} createTableCells={createTableCells} headLabel={headLabel} data={getDataForTable(docs)} selectBy='estudiante' searchBy='estudiante' />
        </>
    )
}

export default AsistenciaTable;
