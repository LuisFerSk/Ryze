import { Icon } from '@iconify/react'
import searchFill from '@iconify/icons-eva/search-fill'
// material
import { styled } from '@material-ui/core/styles'
import {
    Box,
    Toolbar,
    OutlinedInput,
    InputAdornment,
} from '@material-ui/core'

const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3),
}))

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
    }),
    '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${theme.palette.grey[500_32]} !important`,
    }
}))

const TableListToolbar = ({ filter, onFilter, type = 'text' }) => {
    return (
        <RootStyle>
            <SearchStyle
                type={type}
                value={filter}
                onChange={onFilter}
                placeholder='Buscar'
                startAdornment={
                    <InputAdornment position='start'>
                        <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                }
            />
        </RootStyle>
    )
}

export default TableListToolbar;