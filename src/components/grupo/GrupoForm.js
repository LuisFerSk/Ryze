import { Grid, TextField, Button, MenuItem } from '@material-ui/core'

import SaveIcon from '@material-ui/icons/Save'

import usuarios from '../../_mocks_/usuario'
import asignaturas from '../../_mocks_/asignatura'



const GrupoForm = ({ init }) => {

    return (
        <form noValidate autoComplete='off'>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                    <TextField
                        select
                        fullWidth
                        name='profesor'
                        label='Usuario'
                        variant='outlined'

                    >
                        {usuarios.map((row, index) =>
                            <MenuItem key={index} value={row.cedula}>
                                {`${row.cedula} - ${row.nombres} ${row.apellidos}`}
                            </MenuItem>
                        )}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={12} sm={8} lg={8}>
                    <TextField
                        select
                        fullWidth
                        name='asignatura'
                        label='Asignatura'
                        variant='outlined'

                    >
                        {asignaturas.map((row, index) =>
                            <MenuItem key={index} value={row.codigo}>
                                {`${row.codigo} - ${row.titulo}`}
                            </MenuItem>
                        )}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={12} sm={4} lg={4}>
                    <TextField
                        fullWidth
                        type='number'
                        label='Grupo'
                        variant='outlined'
                        name='numeroGrupo'

                    />
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                    <Button
                        type='submit'
                        color='primary'
                        variant='outlined'
                        startIcon={<SaveIcon />}
                    >
                        {init ? 'Actualizar' : 'Registrar'}
                    </Button>
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                </Grid>
            </Grid>
        </form>
    )
}

export default GrupoForm;
