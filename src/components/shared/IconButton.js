import { Icon } from '@iconify/react'
import { IconButton as IconButtonMaterial, Tooltip } from '@material-ui/core'

const IconButton = ({ title, color, onClick, icon, size }) => {
    return (
        <Tooltip title={title}>
            <IconButtonMaterial color={color} onClick={onClick} size={size}>
                <Icon icon={icon} />
            </IconButtonMaterial>
        </Tooltip>
    )
}

export default IconButton;