
import { TextField } from '@material-ui/core';

const TextFieldOutlined = (props) => {
    return (
        <TextField
            fullWidth
            {...props}
            variant='outlined'
        />
    )
}

export default TextFieldOutlined;