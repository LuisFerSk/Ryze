import { Box, Card, Grid, Container } from '@material-ui/core';
import Page from '../components/Page';

import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

import { useGetFacultad } from '../components/uses';
import { createAccordion } from "../utils/specialFunctions";
import FacultadForm from "../components/facultad/FacultadForm";
import FacultadTable from "../components/facultad/FacultadTable";
import ControlledAccordions from "../components/shared/Accordion";

const Facultad = () => {
	const [docs, setDocs] = useGetFacultad();

	const Accordions = [
		createAccordion(
			"Agregar registro",
			<LibraryAddIcon color="primary" />,
			<FacultadForm setDocs={setDocs} />,
		),
	];

	return (
		<Page title="Facultad | Ryze">
			<Container>
				<Grid container spacing={6}>
					<Grid item xs={12} md={12} sm={12} lg={12}>
						<Card>
							<ControlledAccordions accordions={Accordions} indexOpen={0} />
						</Card>
					</Grid>
					<Grid item xs={12} md={12} sm={12} lg={12}>
						<Box>
							<FacultadTable docs={docs} setDocs={setDocs} />
						</Box>
					</Grid>
				</Grid>
			</Container>
		</Page>
	);
}

export default Facultad;