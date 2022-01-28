import { Typography } from '@material-ui/core'

const Undefined = ({ text }) => {
    return (
        <Typography color='secondary'>{text ? text : 'No definido'}</Typography>
    )
}

export default Undefined;