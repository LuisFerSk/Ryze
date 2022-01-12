import { useState } from 'react'

import { styled } from '@material-ui/core/styles'

import { Outlet } from 'react-router-dom'

import DashboardNavbar from './DashboardNavbar'
import DashboardSidebar from './DashboardSidebar'

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
})

const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: 88,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        paddingTop: 116,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    }
}))


const DashboardLayout = () => {
    const [open, setOpen] = useState(false)

    return (
        <RootStyle>
            <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
            <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
            <MainStyle>
                <Outlet />
            </MainStyle>
        </RootStyle>
    )
}

export default DashboardLayout;