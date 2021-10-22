import { useState, useEffect } from 'react';
import { Box, Card, Grid, Container } from '@material-ui/core';

import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

import Page from '../components/Page';
import { asignaturaServices } from '../services';

import { createAccordion } from "../utils/specialFunctions";
import ControlledAccordions from "../components/shared/Accordion";
import AsignaturaForm from "../components/asignatura/AsignaturaForm";
import AsignaturaTable from "../components/asignatura/AsignaturaTable";

const Asignatura = () => {
	const [docs, setDocs] = useState([]);

	const Accordions = [
		createAccordion(
			"Agregar registro",
			<LibraryAddIcon color="primary" />,
			<AsignaturaForm setDocs={setDocs} />,
		),
	];

	useEffect(() => {
		asignaturaServices.Get().then((result) => setDocs(result))
	}, [])
	return (
		<Page title="Asignatura | Ryze">
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
	);
}

export default Asignatura;