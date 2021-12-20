// material
import { Box, Grid, Container, Typography } from '@material-ui/core'
// components
import Page from '../components/Page'
import {
	AppGruposReportes,
	AppProgramasReportes,
	AppUsuariosReportes,
	AppFacultadesReportes,
	AppEstudiantesReportes,
	AppAsignaturasReportes
} from '../components/_dashboard/app'

// ----------------------------------------------------------------------

export default function DashboardApp() {
	return (
		<Page title='Dashboard | Ryze'>
			<Container maxWidth='xl'>
				<Box sx={{ pb: 5 }}>
					<Typography variant='h4'>Hola, Bienvenido de nuevo</Typography>
				</Box>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6} md={3}>
						<AppEstudiantesReportes />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppProgramasReportes />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppUsuariosReportes />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppGruposReportes />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppFacultadesReportes />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppAsignaturasReportes />
					</Grid>
				</Grid>
			</Container>
		</Page>
	)
}
