import PropTypes from 'prop-types'
import { alpha, styled } from '@material-ui/core/styles'


const RootStyle = styled('span')(({ theme, styleProps }) => {
    const { color, variant } = styleProps;

    const styleFilled = (colorEntry) => ({
        color: theme.palette[colorEntry].contrastText,
        backgroundColor: theme.palette[colorEntry].main
    })

    const styleOutlined = (colorEntry) => ({
        color: theme.palette[colorEntry].main,
        backgroundColor: 'transparent',
        border: `1px solid ${theme.palette[colorEntry].main}`
    })

    const styleGhost = (colorEntry) => ({
        color: theme.palette[colorEntry].dark,
        backgroundColor: alpha(theme.palette[colorEntry].main, 0.16)
    })

    return {
        height: 22,
        minWidth: 22,
        lineHeight: 0,
        borderRadius: 8,
        cursor: 'default',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        justifyContent: 'center',
        padding: theme.spacing(0, 1),
        color: theme.palette.grey[800],
        fontSize: theme.typography.pxToRem(12),
        fontFamily: theme.typography.fontFamily,
        backgroundColor: theme.palette.grey[300],
        fontWeight: theme.typography.fontWeightBold,

        ...(color !== 'default'
            ? {
                ...(variant === 'filled' && { ...styleFilled(color) }),
                ...(variant === 'outlined' && { ...styleOutlined(color) }),
                ...(variant === 'ghost' && { ...styleGhost(color) })
            }
            : {
                ...(variant === 'outlined' && {
                    backgroundColor: 'transparent',
                    color: theme.palette.text.primary,
                    border: `1px solid ${theme.palette.grey[500_32]}`
                }),
                ...(variant === 'ghost' && {
                    color: theme.palette.text.secondary,
                    backgroundColor: theme.palette.grey[500_16]
                })
            })
    }
})
export default function Label({ color = 'default', variant = 'ghost', children, ...other }) {
    return (
        <RootStyle styleProps={{ color, variant }} {...other}>
            {children}
        </RootStyle>
    )
}

Label.propTypes = {
    children: PropTypes.node,
    color: PropTypes.oneOf([
        'default',
        'primary',
        'secondary',
        'info',
        'success',
        'warning',
        'error'
    ]),
    variant: PropTypes.oneOf(['filled', 'outlined', 'ghost'])
}
