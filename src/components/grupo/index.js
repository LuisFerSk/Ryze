import { Box, Card, Grid, Container } from '@material-ui/core'

import LibraryAddIcon from '@material-ui/icons/LibraryAdd'

import Page from '../Page'
import GrupoForm from './GrupoForm'
import GrupoTable from './GrupoTable'
import ControlledAccordions from '../shared/Accordion'
import { createAccordion } from '../../utils/specialFunctions'

const Accordions = [
    createAccordion(
        'Agregar registro',
        <LibraryAddIcon color='primary' />,
        <GrupoForm />,
    ),
]

const Grupo = () => {
    return (
        <Page title='Grupo | Ryze'>
            <Container>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <Card>
                            <ControlledAccordions accordions={Accordions} indexOpen={0} />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <Box>
                            <GrupoTable />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}

export default Grupo;