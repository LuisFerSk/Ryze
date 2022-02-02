import { useParams } from "react-router-dom"
import { Box, Grid, Container, Typography } from '@material-ui/core'

import Page from '../Page'
import AsistenciaTable from './AsistenciaTable'
import { useGetDocs } from '../uses'
import { matriculaGetByGrupo } from '../matriculaAcademica/matriculaAcademicaService'

const Asistencia = () => {
    const params = useParams()

    const { grupo } = params;

    const [docs, setDocs] = useGetDocs(matriculaGetByGrupo(grupo))

    return (
        <Page title='Grupo | Ryze'>
            <Container>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <Typography variant="h4">
                            Grupo: {grupo}
                        </Typography>
                    </Grid>
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