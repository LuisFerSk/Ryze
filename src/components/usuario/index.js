import { Box, Card, Grid, Container } from '@material-ui/core'

import LibraryAddIcon from '@material-ui/icons/LibraryAdd'

import Page from '../Page'
import { usuarioGet } from './usuarioService'
import { useGetDocs } from '../uses'
import { createAccordion } from '../../utils/specialFunctions'
import UsuarioForm from './UsuarioForm'
import UsuarioTable from './UsuarioTable'
import ControlledAccordions from '../shared/Accordion'

const Usuario = () => {
    const [docs, setDocs] = useGetDocs(usuarioGet())

    const Accordions = [
        createAccordion(
            'Agregar registro',
            <LibraryAddIcon color='primary' />,
            <UsuarioForm setDocs={setDocs} />,
        ),
    ]

    return (
        <Page title='Usuarioes | Ryze'>
            <Container>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <Card>
                            <ControlledAccordions accordions={Accordions} indexOpen={0} />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <Box>
                            <UsuarioTable docs={docs} setDocs={setDocs} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}

export default Usuario;