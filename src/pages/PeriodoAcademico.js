// material
import { Card, Grid, Container } from '@material-ui/core';
// components
import Page from '../components/Page';

import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

import { createAccordion } from "../utils/specialFunctions";
import ControlledAccordions from "../components/shared/Accordion";
import PeriodoAcademicoForm from "../components/periodoAcademico/PeriodoAcademicoForm";
import PeriodoAcademicoTable from "../components/periodoAcademico/PeriodoAcademicoTable";

// ----------------------------------------------------------------------

const Accordions = [
  createAccordion(
    "Agregar registro",
    <LibraryAddIcon color="primary" />,
    <PeriodoAcademicoForm />,
  ),
];

export default function PeriodoAcademico() {
  return (
    <Page title="Periodo academico | Ryze">
      <Container maxWidth="xl" >
        <Grid container spacing={6}>
          <Grid item xs={12} md={12} sm={12} lg={12}>
            <Card>
              <ControlledAccordions accordions={Accordions} />
            </Card>
          </Grid>
          <Grid item xs={12} md={12} sm={12} lg={12}>
            <Card>
              <PeriodoAcademicoTable />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
