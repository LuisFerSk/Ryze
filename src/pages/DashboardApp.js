import { Box, Grid, Container, Typography } from '@material-ui/core'

import {
    AppGruposReportes,
    AppUsuariosReportes,
    AppAsignaturasReportes,
} from '../components/_dashboard/app'
import Page from '../components/Page'

const DashboardApp = () => {
    return (
        <Page title='Dashboard | Ryze'>
            <Container maxWidth='xl'>
                <Box sx={{ pb: 5 }}>
                    <Typography variant='h4'>Hola, Bienvenido de nuevo</Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppUsuariosReportes />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppGruposReportes />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppAsignaturasReportes />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}

export default DashboardApp;