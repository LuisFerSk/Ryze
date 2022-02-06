import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { styled } from '@material-ui/core/styles'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Box, Link, Drawer, Typography, Avatar } from '@material-ui/core'

import Logo from '../../components/Logo'
import Scrollbar from '../../components/Scrollbar'
import NavSection from '../../components/NavSection'
import { useContextUser } from '../../components/uses'
import { MHidden } from '../../components/@material-extend'
import { ESTUDIANTE, ADMINISTRADOR, PROFESOR } from '../../_mocks_/roles'
import { sidebarConfigAdministrador, sidebarConfigEstudiante, sidebarConfigProfesor } from './SidebarConfig'


const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: DRAWER_WIDTH
    }
}))

const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: theme.shape.borderRadiusSm,
    backgroundColor: theme.palette.grey[200]
}))

const DashboardSidebar = ({ isOpenSidebar, onCloseSidebar }) => {
    const { pathname } = useLocation()

    const user = useContextUser()

    const { data } = user

    const getDashboardConfig = () => {
        switch (data.tipo) {
            case ADMINISTRADOR:
                return sidebarConfigAdministrador
            case PROFESOR:
                return sidebarConfigProfesor
            case ESTUDIANTE:
                return sidebarConfigEstudiante
            default:
                return []
        }
    }

    useEffect(() => {
        if (isOpenSidebar) {
            onCloseSidebar()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    const renderContent = (
        <Scrollbar
            sx={{
                height: '100%',
                '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
            }}
        >
            <Box sx={{ px: 2.5, py: 3 }}>
                <Box component={RouterLink} to='/' sx={{ display: 'inline-flex' }}>
                    <Logo />
                </Box>
            </Box>
            <Box sx={{ mb: 5, mx: 2.5 }}>
                <Link underline='none' component={RouterLink} to='#'>
                    <AccountStyle>
                        <Avatar src={data.photoURL} alt='photoURL' />
                        <Box sx={{ ml: 2 }}>
                            <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                                {data.nombres}
                            </Typography>
                            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                                {data.email}
                            </Typography>
                        </Box>
                    </AccountStyle>
                </Link>
            </Box>
            <NavSection navConfig={getDashboardConfig()} />
            <Box sx={{ flexGrow: 1 }} />
        </Scrollbar>
    )

    return (
        <RootStyle>
            <MHidden width='lgUp'>
                <Drawer
                    open={isOpenSidebar}
                    onClose={onCloseSidebar}
                    PaperProps={{
                        sx: { width: DRAWER_WIDTH }
                    }}
                >
                    {renderContent}
                </Drawer>
            </MHidden>

            <MHidden width='lgDown'>
                <Drawer
                    open
                    variant='persistent'
                    PaperProps={{
                        sx: {
                            width: DRAWER_WIDTH,
                            bgcolor: 'background.default'
                        }
                    }}
                >
                    {renderContent}
                </Drawer>
            </MHidden>
        </RootStyle>
    )
}

DashboardSidebar.propTypes = {
    isOpenSidebar: PropTypes.bool,
    onCloseSidebar: PropTypes.func
}

export default DashboardSidebar;