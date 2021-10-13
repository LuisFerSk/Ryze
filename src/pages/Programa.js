// material
import { Box,Card, Grid, Container } from '@material-ui/core';
// components
import Page from '../components/Page';

import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

import { createAccordion } from "../utils/specialFunctions";
import ProgramaForm from "../components/programa/ProgramaForm";
import ProgramaTable from "../components/programa/ProgramaTable";
import ControlledAccordions from "../components/shared/Accordion";

// ----------------------------------------------------------------------

const Accordions = [
  createAccordion(
    "Agregar registro",
    <LibraryAddIcon color="primary" />,
    <ProgramaForm />,
  ),
];

export default function Programa() {
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
              <ProgramaTable />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
