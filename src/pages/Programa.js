import { useState, useEffect } from 'react';
import { Box, Card, Grid, Container } from '@material-ui/core';

import Page from '../components/Page';

import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

import { programaServices } from '../services';
import { createAccordion } from "../utils/specialFunctions";
import ProgramaForm from "../components/programa/ProgramaForm";
import ProgramaTable from "../components/programa/ProgramaTable";
import ControlledAccordions from "../components/shared/Accordion";

const Programa = () => {
	const [docs, setDocs] = useState([]);

	const Accordions = [
		createAccordion(
			"Agregar registro",
			<LibraryAddIcon color="primary" />,
			<ProgramaForm setDocs={setDocs} />,
		),
	];

	useEffect(() => {
		programaServices.Get().then((result) => setDocs(result))
	}, []);

	return (
		<Page title="Programa | Ryze">
			<Container>
				<Grid container spacing={6}>
					<Grid item xs={12} md={12} sm={12} lg={12}>
						<Card>
							<ControlledAccordions accordions={Accordions} indexOpen={0} />
						</Card>
					</Grid>
					<Grid item xs={12} md={12} sm={12} lg={12}>
						<Box>
							<ProgramaTable docs={docs} setDocs={setDocs} />
						</Box>
					</Grid>
				</Grid>
			</Container>
		</Page>
	);
}

export default Programa;