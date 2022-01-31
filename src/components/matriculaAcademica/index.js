import { Box, Card, Grid, Container } from '@material-ui/core'

import LibraryAddIcon from '@material-ui/icons/LibraryAdd'

import Page from '../Page'
import { useGetDocs } from '../uses'
import ControlledAccordions from '../shared/Accordion'
import MatriculaAcademicaForm from './MatriculaAcademicaForm'
import { createAccordion } from '../../utils/specialFunctions'
import MatriculaAcedemicaTable from './MatriculaAcedemicaTable'
import { matriculaAcademicaGetAll } from './matriculaAcademicaService'


const MatriculaAcademica = () => {
    const [docs, setDocs] = useGetDocs(matriculaAcademicaGetAll())

    const Accordions = [
        createAccordion(
            'Agregar registro',
            <LibraryAddIcon color='primary' />,
            <MatriculaAcademicaForm setDocs={setDocs} />,
        ),
    ]

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
                            <MatriculaAcedemicaTable docs={docs} setDocs={setDocs} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}

export default MatriculaAcademica;