import CustomTable from "../shared/Table"

import { TableCell } from '@material-ui/core';

import Label from '../Label';

import facultades from '../../_mocks_/facultad';

const headLabel = [
    { id: 'titulo', label: 'Facultad', alignRight: false },
    { id: 'estado', label: 'Estado', alignRight: false},
    { id: '' }
];

const cells = (row) => {
    const { titulo, estado } = row;

    return (
        <>
            <TableCell align="left">{titulo}</TableCell>
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
        <CustomTable cells={cells} headLabel={headLabel} data={facultades} selectBy="titulo" searchBy="titulo" />
    );
};

export default FacultadTable;
