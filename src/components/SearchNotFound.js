import PropTypes from 'prop-types'
import { Paper, Typography } from '@material-ui/core'

const SearchNotFound = ({ searchQuery = '', ...other }) => {
    return (
        <Paper {...other}>
            <Typography gutterBottom align='center' variant='subtitle1'>
                No se encontro
            </Typography>
            <Typography variant='body2' align='center'>
                No se encontraron resultados para &nbsp;
                <strong>&quot;{searchQuery}&quot;</strong>. Intente comprobar si hay errores tipográficos o utilice palabras completas.
            </Typography>
        </Paper>
    )
}

SearchNotFound.propTypes = {
    searchQuery: PropTypes.string,
}

export default SearchNotFound;