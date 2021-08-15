import CustomTable from "../shared/Table"

import { TableCell } from '@material-ui/core';

import Label from '../Label';

import programas from '../../_mocks_/programa';

const headLabel = [
    { id: 'titulo', label: 'Programa', alignRight: false },
    { id: 'facultad', label: 'Facultad', alignRight: false },
    { id: 'estado', label: 'Estado', alignRight: false},
    { id: '' }
];

const cells = (row) => {
    const { titulo, facultad, estado } = row;

    return (
        <>
            <TableCell align="left">{titulo}</TableCell>
            <TableCell align="left">{facultad}</TableCell>
            <TableCell align="left">
                <Label
                    variant="ghost"
                    color={(estado === true && 'success') || 'error'}
                >
                    {estado === true ? 'Abierto' : 'Cerrado'}
                </Label>
            </TableCell>
        </>
    );
};

const FacultadTable = () => {

    return (
        <CustomTable cells={cells} headLabel={headLabel} data={programas} selectBy="titulo" searchBy="titulo" />
    );
};

export default FacultadTable;
