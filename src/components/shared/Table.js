import { useState } from 'react';

import {
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination
} from '@material-ui/core';

import Scrollbar from '../Scrollbar';
import SearchNotFound from '../SearchNotFound';
import TableListHead from "./table/TableListHead";
import TableListToolbar from "./table/TableListToolbar";
import { getComparator, applySortFilter } from './table/TableFunctions';

const CustomTable = ({ headLabel, data, selectBy, cells, searchBy }) => {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState(selectBy);
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const filteredUsers = applySortFilter(data, getComparator(order, orderBy), filterName, searchBy);

    return (
        <>
            <TableListToolbar
                filterName={filterName}
                numSelected={selected.length}
                onFilterName={(event) => {
                    setFilterName(event.target.value);
                }}
            />
            <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                        <TableListHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={headLabel}
                            rowCount={data.length}
                            numSelected={selected.length}
                            onRequestSort={(event, property) => {
                                const isAsc = orderBy === property && order === 'asc';
                                setOrder(isAsc ? 'desc' : 'asc');
                                setOrderBy(property);
                            }}
                            onSelectAllClick={(event) => {
                                if (event.target.checked) {
                                    const newSelecteds = data.map((n) => n[selectBy]);
                                    setSelected(newSelecteds);
                                    return;
                                }
                                setSelected([]);
                            }}
                        />
                        <TableBody>
                            {filteredUsers
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const selectValue = row[selectBy];
                                    const isItemSelected = selected.indexOf(selectValue) !== -1;

                                    return (
                                        <TableRow
                                            hover
                                            key={index}
                                            tabIndex={-1}
                                            role="checkbox"
                                            selected={isItemSelected}
                                            aria-checked={isItemSelected}
                                        >
                                            {cells(row)}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        {filteredUsers.length === 0 && (
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                        <SearchNotFound searchQuery={filterName} />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
            </Scrollbar>
            <TablePagination
                page={page}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                }}
                onPageChange={(event, newPage) => {
                    setPage(newPage);
                }}
            />
        </>
    );
}

export default CustomTable;
