// material
import { Box, Card, Grid, Container } from '@material-ui/core';
// components
import Page from '../components/Page';

import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

import { useGetDocs } from '../components/uses';
import { estudianteServices } from '../services';
import { createAccordion } from "../utils/specialFunctions";
import ControlledAccordions from "../components/shared/Accordion";
import EstudianteForm from "../components/estudiante/EstudianteForm";
import EstudianteTable from "../components/estudiante/EstudianteTable";

const Estudiante = () => {
    const [docs, setDocs] = useGetDocs(estudianteServices.Get());

    const Accordions = [
        createAccordion(
            "Agregar registro",
            <LibraryAddIcon color="primary" />,
            <EstudianteForm setDocs={setDocs} />,
        ),
    ];
    return (
        <Page title="Estudiante | Ryze">
            <Container>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <Card>
                            <ControlledAccordions accordions={Accordions} indexOpen={0} />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <Box>
                            <EstudianteTable docs={docs} setDocs={setDocs} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}

export default Estudiante;
