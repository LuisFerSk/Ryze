import { Box, Grid, Container } from '@material-ui/core'

import Page from '../Page'

import AsistenciaTable from './AsistenciaTable'
import { useGetDocs, useContextUser } from '../uses'
import { grupoGetAllProfesor } from '../grupo/grupoService'
const Asistencia = () => {
    const user = useContextUser()

    const { data } = user;

    const [docs, setDocs] = useGetDocs(grupoGetAllProfesor(data.identificacion))

    return (
        <Page title='Grupo | Ryze'>
            <Container>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <Box>
                            <AsistenciaTable docs={docs} setDocs={setDocs} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}

export default Asistencia;