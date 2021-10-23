import { useState, useEffect } from 'react';
import { Box, Card, Grid, Container } from '@material-ui/core';
// components
import Page from '../components/Page';

import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

import { profesorServices } from '../services';
import { createAccordion } from "../utils/specialFunctions";
import ProfesorForm from '../components/profesor/ProfesorForm';
import ProfesorTable from '../components/profesor/ProfesorTable';
import ControlledAccordions from "../components/shared/Accordion";

// ----------------------------------------------------------------------



const Profesor = () => {
    const [docs, setDocs] = useState([]);

    const Accordions = [
        createAccordion(
            "Agregar registro",
            <LibraryAddIcon color="primary" />,
            <ProfesorForm setDocs={setDocs} />,
        ),
    ];

    useEffect(() => {
        profesorServices.Get().then((result) => setDocs(result))
    }, [])

    return (
        <Page title="Profesores | Ryze">
            <Container>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <Card>
                            <ControlledAccordions accordions={Accordions} indexOpen={0} />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <Box>
                            <ProfesorTable docs={docs} setDocs={setDocs} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}

export default Profesor;