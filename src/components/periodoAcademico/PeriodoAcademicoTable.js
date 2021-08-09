import CustomTable from "../shared/Table"
import { sentenceCase } from 'change-case';

import {
    Stack,
    Avatar,
    TableCell,
    Typography,
} from '@material-ui/core';

import Label from '../Label';

import USERLIST from '../../_mocks_/user';

const headLabel = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'company', label: 'Company', alignRight: false },
    { id: 'role', label: 'Role', alignRight: false },
    { id: 'isVerified', label: 'Verified', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false }
];

const cells = (row) => {
    const { name, role, status, company, avatarUrl, isVerified } = row;

    return (
        <>
            <TableCell component="th" scope="row" padding="none">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar alt={name} src={avatarUrl} />
                    <Typography variant="subtitle2" noWrap>
                        {name}
                    </Typography>
                </Stack>
            </TableCell>
            <TableCell align="left">{company}</TableCell>
            <TableCell align="left">{role}</TableCell>
            <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
            <TableCell align="left">
                <Label
                    variant="ghost"
                    color={(status === 'banned' && 'error') || 'success'}
                >
                    {sentenceCase(status)}
                </Label>
            </TableCell>
        </>
    );
};

const PeriodoAcademicoTable = () => {

    return (
        <CustomTable cells={cells} headLabel={headLabel} data={USERLIST} selectBy="name" />
    );
};

export default PeriodoAcademicoTable;
