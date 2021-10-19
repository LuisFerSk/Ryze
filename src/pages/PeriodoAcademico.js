import { useState, useEffect } from 'react';
import { Box, Card, Grid, Container } from '@material-ui/core';
// components
import Page from '../components/Page';

import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

import { periodoAcademicoServices } from '../services';
import { createAccordion } from "../utils/specialFunctions";
import ControlledAccordions from "../components/shared/Accordion";
import PeriodoAcademicoForm from "../components/periodoAcademico/PeriodoAcademicoForm";
import PeriodoAcademicoTable from "../components/periodoAcademico/PeriodoAcademicoTable";

// ----------------------------------------------------------------------

export default function PeriodoAcademico() {

	const [docs, setDocs] = useState([]);

	const Accordions = [
		createAccordion(
			"Agregar registro",
			<LibraryAddIcon color="primary" />,
			<PeriodoAcademicoForm setDocs={setDocs} />,
		),
	];

	useEffect(() => {
		periodoAcademicoServices.Get().then((result) => setDocs(result))
	}, [])

	return (
		<Page title="Periodo academico | Ryze">
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
	);
}
