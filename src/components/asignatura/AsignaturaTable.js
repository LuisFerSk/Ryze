import CustomTable from "../shared/Table"

import { TableCell } from '@material-ui/core';

import Label from '../Label';

import asignaturas from '../../_mocks_/asignatura';

const headLabel = [
    { id: 'codigo', label: 'Codigo', alignRight: false },
    { id: 'titulo', label: 'Nombre', alignRight: false },
    { id: 'estado', label: 'Estado', alignRight: false },
    { id: '' },
];

const cells = (row) => {
    const { codigo, titulo, estado } = row;

    return (
        <>
            <TableCell align="left">{codigo}</TableCell>
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
        <CustomTable cells={cells} headLabel={headLabel} data={asignaturas} selectBy="titulo" searchBy="titulo" />
    );
};

export default FacultadTable;
