import { Form, FormikProvider } from 'formik'
import { Grid, TextField, Button, MenuItem } from '@material-ui/core'

import SaveIcon from '@material-ui/icons/Save'

import estados from '../../_mocks_/estados'
import PeriodoAcademicoTitulo from './PeriodoAcademicoTitulo'
import PeriodoAcademicoSchema from './PeriodoAcademicoSchema'

const PeriodoAcademicoForm = props => {
    const [mensaje, setMensaje, formik] = PeriodoAcademicoSchema({ ...props })

    const { init } = props;

    const { errors, touched, handleSubmit, getFieldProps } = formik;

    const titulo = getFieldProps('titulo')
    const estado = getFieldProps('estado')
    const fechaFin = getFieldProps('fechaFin')
    const fechaInicio = getFieldProps('fechaInicio')

    return (
        <FormikProvider value={formik} >
            <Form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                            fullWidth
                            {...titulo}
                            variant='outlined'
                            label='Periodo academico'
                            helperText={touched.titulo && errors.titulo}
                            error={Boolean(touched.titulo && errors.titulo)}
                            InputProps={{
                                inputComponent: PeriodoAcademicoTitulo,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={e => {
                                setMensaje()
                                titulo.onChange(e)
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                            select
                            fullWidth
                            {...estado}
                            label='Estado'
                            variant='outlined'
                            helperText={touched.estado && errors.estado}
                            error={Boolean(touched.estado && errors.estado)}
                            onChange={e => {
                                setMensaje()
                                estado.onChange(e)
                            }}
                        >
                            {estados.map((row, index) =>
                                <MenuItem key={index} value={row.value}>
                                    {row.label}
                                </MenuItem>
                            )}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                            fullWidth
                            type='date'
                            {...fechaInicio}
                            variant='outlined'
                            label='Fecha de inicio'
                            helperText={touched.fechaInicio && errors.fechaInicio}
                            error={Boolean(touched.fechaInicio && errors.fechaInicio)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={e => {
                                setMensaje()
                                fechaInicio.onChange(e)
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                            fullWidth
                            type='date'
                            {...fechaFin}
                            variant='outlined'
                            label='Fecha de finalización'
                            helperText={touched.fechaFin && errors.fechaFin}
                            error={Boolean(touched.fechaFin && errors.fechaFin)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={e => {
                                setMensaje()
                                fechaFin.onChange(e)
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <Button
                            type='submit'
                            variant='outlined'
                            startIcon={<SaveIcon />}
                            color={init ? 'info' : 'primary'}
                        >
                            {init ? 'Actualizar' : 'Registrar'}
                        </Button>
                    </Grid>
                    <Grid container spacing={0} item xs={12} md={12} sm={12} lg={12} justifyContent='center'>
                        {mensaje}
                    </Grid>
                </Grid>
            </Form>
        </FormikProvider >
    )
}

export default PeriodoAcademicoForm;
