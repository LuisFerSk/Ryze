import CustomTable from '../shared/Table'

import { TableCell } from '@material-ui/core'

import grupos from '../../_mocks_/grupo'

const headLabel = [
    { id: 'numero', label: 'Grupo', alignRight: false },
    { id: 'asignatura', label: 'Asignatura', alignRight: false },
    { id: 'profesor', label: 'Usuario', alignRight: false },
]

const createTableCells = row => {
    const { numero, asignatura, profesor } = row;

    return (
        <>
            <TableCell align='left'>{numero}</TableCell>
            <TableCell align='left'>{asignatura}</TableCell>
            <TableCell align='left'>{profesor}</TableCell>
        </>
    )
}

const GrupoTable = () => {

    return (
        <CustomTable createTableCells={createTableCells} headLabel={headLabel} data={grupos} selectBy='numero' searchBy='numero' />
    )
}

export default GrupoTable;
