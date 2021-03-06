import { useState } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'
import { alpha, useTheme, styled } from '@material-ui/core/styles'
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill'
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill'
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom'
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@material-ui/core'


const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(
    ({ theme }) => ({
        ...theme.typography.body2,
        height: 48,
        position: 'relative',
        textTransform: 'capitalize',
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(2.5),
        color: theme.palette.text.secondary,
        '&:before': {
            top: 0,
            right: 0,
            width: 3,
            bottom: 0,
            content: '""',
            display: 'none',
            position: 'absolute',
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            backgroundColor: theme.palette.primary.main,
        }
    })
)

const ListItemIconStyle = styled(ListItemIcon)({
    width: 22,
    height: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
}

const NavItem = ({ item, active }) => {
    const theme = useTheme()
    const isActiveRoot = active(item.path)
    const [open, setOpen] = useState(isActiveRoot)
    const { title, path, icon, info, children } = item;

    const handleOpen = () => {
        setOpen(prev => !prev)
    }

    const activeRootStyle = {
        color: 'primary.main',
        fontWeight: 'fontWeightMedium',
        bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        '&:before': { display: 'block' },
    }

    if (children) {
        return (
            <>
                <ListItemStyle
                    onClick={handleOpen}
                    sx={{
                        ...(isActiveRoot ? activeRootStyle : undefined)
                    }}
                >
                    <ListItemIconStyle>{icon ? icon : null}</ListItemIconStyle>
                    <ListItemText disableTypography primary={title} />
                    {info ? info : null}
                    <Box
                        component={Icon}
                        icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
                        sx={{ width: 16, height: 16, ml: 1 }}
                    />
                </ListItemStyle>

                <Collapse in={open} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                        {children.map(rowChildren => {
                            const isActiveSub = active(rowChildren.path)

                            return (
                                <ListItemStyle
                                    to={rowChildren.path}
                                    component={RouterLink}
                                    key={rowChildren.title}
                                    sx={{
                                        ...(isActiveSub ? activeSubStyle : undefined)
                                    }}
                                >
                                    <ListItemIconStyle>
                                        <Box
                                            component='span'
                                            sx={{
                                                width: 4,
                                                height: 4,
                                                display: 'flex',
                                                borderRadius: '50%',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                bgcolor: 'text.disabled',
                                                transition: themeTransition => themeTransition.transitions.create('transform'),
                                                ...(isActiveSub && {
                                                    transform: 'scale(2)',
                                                    bgcolor: 'primary.main',
                                                })
                                            }}
                                        />
                                    </ListItemIconStyle>
                                    <ListItemText disableTypography primary={rowChildren.title} />
                                </ListItemStyle>
                            )
                        })}
                    </List>
                </Collapse>
            </>
        )
    }

    return (
        <ListItemStyle
            component={RouterLink}
            to={path}
            sx={{
                ...(isActiveRoot ? activeRootStyle : null)
            }}
        >
            <ListItemIconStyle>{icon ? icon : null}</ListItemIconStyle>
            <ListItemText disableTypography primary={title} />
            {info ? info : null}
        </ListItemStyle>
    )
}

NavItem.propTypes = {
    item: PropTypes.object,
    active: PropTypes.func,
}

const NavSection = ({ navConfig, ...other }) => {
    const { pathname } = useLocation()
    const match = path => (path ? !!matchPath({ path, end: false }, pathname) : false)

    return (
        <Box {...other}>
            <List disablePadding>
                {navConfig.map(item => (
                    <NavItem key={item.title} item={item} active={match} />
                ))}
            </List>
        </Box>
    )
}

NavSection.propTypes = {
    navConfig: PropTypes.array,
}

export default NavSection;