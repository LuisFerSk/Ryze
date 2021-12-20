import { Box, Card, Grid, Container } from '@material-ui/core'

import LibraryAddIcon from '@material-ui/icons/LibraryAdd'

import Page from '../Page'
import { useGetDocs } from '../uses'
import AsignaturaForm from './AsignaturaForm'
import AsignaturaTable from './AsignaturaTable'
import asignaturaService from './asignaturaService'
import ControlledAccordions from '../shared/Accordion'
import { createAccordion } from '../../utils/specialFunctions'

const Asignatura = () => {
	const [docs, setDocs] = useGetDocs(asignaturaService.Get())

	const Accordions = [
		createAccordion(
			'Agregar registro',
			<LibraryAddIcon color='primary' />,
			<AsignaturaForm setDocs={setDocs} />,
		),
	]

	return (
		<Page title='Asignatura | Ryze'>
			<Container>
				<Grid container spacing={6}>
					<Grid item xs={12} md={12} sm={12} lg={12}>
						<Card>
							<ControlledAccordions accordions={Accordions} indexOpen={0} />
						</Card>
					</Grid>
					<Grid item xs={12} md={12} sm={12} lg={12}>
						<Box>
							<AsignaturaTable docs={docs} setDocs={setDocs} />
						</Box>
					</Grid>
				</Grid>
			</Container>
		</Page>
	)
}

export default Asignatura;