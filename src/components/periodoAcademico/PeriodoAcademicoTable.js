import CustomTable from "../shared/Table"

import { TableCell } from '@material-ui/core';

import data from '../../_mocks_/periodoAcademico';

import Label from '../Label';

const headLabel = [
    { id: 'titulo', label: 'Periodo', alignRight: false },
    { id: 'fechaInicio', label: 'Fecha de inicio', alignRight: false },
    { id: 'fechaFin', label: 'Fecha de finalización', alignRight: false },
    { id: 'estado', label: 'Estado', alignRight: false, },
    { id: '' }
];

const cells = (row) => {
    const { titulo, estado, fechaInicio, fechaFin } = row;

    return (
        <>
            <TableCell align="left">{titulo}</TableCell>
            <TableCell align="left">{fechaInicio}</TableCell>
            <TableCell align="left">{fechaFin}</TableCell>
            <TableCell align="left">
                <Label
                    variant="ghost"
                    color={(estado === true && 'success') || 'error'}
                >
                    {estado === true ? 'Abierto' : 'Cerrado'}
                </Label></TableCell>
        </>
    );
};

const PeriodoAcademicoTable = () => {

    return (
        <CustomTable cells={cells} headLabel={headLabel} data={data} selectBy="titulo" searchBy="titulo" />
    );
};

export default PeriodoAcademicoTable;
