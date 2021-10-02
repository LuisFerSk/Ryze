import CustomTable from "../shared/Table"

import { TableCell } from '@material-ui/core';

import Label from '../Label';

import profesor from '../../_mocks_/profesor';

const headLabel = [
    { id: 'cedula', label: 'Número de identificación', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'nombres', label: 'Nombres y apelldio', alignRight: false },
    { id: 'estado', label: 'Estado', alignRight: false },
];

const cells = (row) => {
    const { cedula, email, nombres, apellidos, estado } = row;

    return (
        <>
            <TableCell align="left">{cedula}</TableCell>
            <TableCell align="left">{email}</TableCell>
            <TableCell align="left">{`${nombres} ${apellidos}`}</TableCell>
            <TableCell align="left">
                <Label
                    variant="ghost"
                    color={(estado === true && 'success') || 'error'}
                >
                    {estado === true ? 'Activo' : 'Inactivo'}
                </Label>
            </TableCell>
        </>
    );
};

const ProfesorTable = () => {

    return (
        <CustomTable cells={cells} headLabel={headLabel} data={profesor} selectBy="cedula" searchBy="cedula" />
    );
};

export default ProfesorTable;
