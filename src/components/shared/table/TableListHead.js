import PropTypes from 'prop-types'
// material
import { visuallyHidden } from '@material-ui/utils'
import { Box, TableRow, TableCell, TableHead, TableSortLabel } from '@material-ui/core'

const TableListHead = ({
    order,
    orderBy,
    headLabel,
    onRequestSort,
}) => {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    }

    const getOrderTextBox = () => {
        return order === 'desc' ? 'sorted descending' : 'sorted ascending'
    }

    return (
        <TableHead>
            <TableRow>
                {headLabel.map((headCell) => (
                    <TableCell padding={headCell.padding}
                        key={headCell.id}
                        align={headCell.alignRight ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            hideSortIcon
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box sx={{ ...visuallyHidden }}>
                                    {getOrderTextBox()}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

TableListHead.propTypes = {
    order: PropTypes.oneOf(['asc', 'desc']),
    orderBy: PropTypes.string,
    headLabel: PropTypes.array,
    onRequestSort: PropTypes.func,
}

export default TableListHead;