import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'

const Logo = ({ sx }) => {
    return <Box component='img' src='/static/logo.png' sx={{ width: 40, height: 40, ...sx }} />
}

Logo.propTypes = {
    sx: PropTypes.object,
}

export default Logo;