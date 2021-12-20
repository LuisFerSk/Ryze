import { Box, Card, Grid, Container } from '@material-ui/core'
// components
import Page from '../Page'

import LibraryAddIcon from '@material-ui/icons/LibraryAdd'

import { useGetDocs } from '../uses'
import ControlledAccordions from '../shared/Accordion'
import PeriodoAcademicoForm from './PeriodoAcademicoForm'
import PeriodoAcademicoTable from './PeriodoAcademicoTable'
import { createAccordion } from '../../utils/specialFunctions'
import periodoAcademicoService  from './periodoAcademicoService'

// ----------------------------------------------------------------------

export default function PeriodoAcademico() {
	const [docs, setDocs] = useGetDocs(periodoAcademicoService.Get())

	const Accordions = [
		createAccordion(
			'Agregar registro',
			<LibraryAddIcon color='primary' />,
			<PeriodoAcademicoForm setDocs={setDocs} />,
		),
	]

	return (
		<Page title='Periodo academico | Ryze'>
			<Container>
				<Grid container spacing={6}>
					<Grid item xs={12} md={12} sm={12} lg={12}>
						<Card>
							<ControlledAccordions accordions={Accordions} indexOpen={0} />
						</Card>
					</Grid>
					<Grid item xs={12} md={12} sm={12} lg={12}>
						<Box>
							<PeriodoAcademicoTable docs={docs} setDocs={setDocs} />
						</Box>
					</Grid>
				</Grid>
			</Container>
		</Page>
	)
}
