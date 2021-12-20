import { filter } from 'lodash'
import { Icon } from '@iconify/react'
import { MenuItem, ListItemIcon, ListItemText } from '@material-ui/core'

export const mappingMenuItem = options =>
    options.map((row, index) =>
        <MenuItem
            key={index}
            onClick={row.onClick}
            sx={{ color: 'text.secondary' }}
        >
            <ListItemIcon>
                <Icon icon={row.icon} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary={row.label} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
    )

export const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export const getComparator = (order, orderBy) =>
    order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)


export const applySortFilter = (array, comparator, query, searchBy) => {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order;
        return a[1] - b[1]
    })
    if (query) {
        return filter(array, header => header[searchBy].toString().toLowerCase().indexOf(query.toLowerCase()) !== -1)
    }
    return stabilizedThis.map(el => el[0])
}
