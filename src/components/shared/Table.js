import { useState } from 'react'

import {
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    Table as MaterialTable,
} from '@material-ui/core'

import Scrollbar from '../Scrollbar'
import SearchNotFound from '../SearchNotFound'
import TableListHead from './table/TableListHead'
import TableListToolbar from './table/TableListToolbar'
import { getComparator, applySortFilter } from './table/TableFunctions'

const Table = ({ headLabel, data, selectBy, createTableCells, searchBy, }) => {
    const [page, setPage] = useState(0)
    const [filter, setFilter] = useState('')
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState(selectBy)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const filtered = applySortFilter(data, getComparator(order, orderBy), filter, searchBy)

    return (
        <>
            <TableListToolbar
                filter={filter}
                onFilter={({ target }) => {
                    setFilter(target.value)
                }}
            />
            <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                    <MaterialTable>
                        <TableListHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={headLabel}
                            onRequestSort={(event, property) => {
                                const isAsc = orderBy === property && order === 'asc'
                                setOrder(isAsc ? 'desc' : 'asc')
                                setOrderBy(property)
                            }}
                        />
                        <TableBody>
                            {filtered
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) =>
                                    <TableRow
                                        hover
                                        key={index}
                                        tabIndex={-1}
                                        role='checkbox'
                                    >
                                        {createTableCells(row)}
                                    </TableRow>
                                )}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        {filtered.length === 0 && (
                            <TableBody>
                                <TableRow>
                                    <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                                        <SearchNotFound searchQuery={filter} />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                    </MaterialTable>
                </TableContainer>
            </Scrollbar>
            <TablePagination
                page={page}
                component='div'
                count={data.length}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={({ target }) => {
                    setRowsPerPage(parseInt(target.value, 10))
                    setPage(0)
                }}
                onPageChange={(event, newPage) => {
                    setPage(newPage)
                }}
            />
        </>
    )
}

export default Table;
