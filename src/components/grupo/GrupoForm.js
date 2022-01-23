import { Form, FormikProvider, useFormik } from 'formik'
import SaveIcon from '@material-ui/icons/Save'
import { Grid, TextField, Button, MenuItem } from '@material-ui/core'

import { useMensaje } from '../uses'
import usuarios from '../../_mocks_/usuario'
import asignaturas from '../../_mocks_/asignatura'
import { grupoInitialValues, grupoSchema } from './GrupoSchema'


const GrupoForm = ({ id, init, setDocss }) => {
    const [mensaje, setMensaje, mensajeLoader] = useMensaje()

    const formik = useFormik({
        initialValues: id && init ? init : grupoInitialValues,
        validationSchema: grupoSchema,
        onSubmit: (values, { resetForm }) => {
            mensajeLoader()
        }
    })

    const { errors, touched, handleSubmit, getFieldProps } = formik;

    const grupo = getFieldProps('grupo')
    const profesor = getFieldProps('profesor')
    const asignatura = getFieldProps('asignatura')

    return (
        <FormikProvider value={formik}>
            <Form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <TextField
                            select
                            fullWidth
                            {...profesor}
                            label='Profesor'
                            variant='outlined'
                            helperText={touched.profesor && errors.profesor}
                            error={Boolean(touched.profesor && errors.profesor)}
                            onChange={event => {
                                setMensaje()
                                profesor.onChange(event)
                            }}
                        >
                            {usuarios.map((row, index) =>
                                <MenuItem key={index} value={row.identificacion}>
                                    {`${row.identificacion} - ${row.nombres} ${row.apellidos}`}
                                </MenuItem>
                            )}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={12} sm={8} lg={8}>
                        <TextField
                            select
                            fullWidth
                            {...asignatura}
                            label='Asignatura'
                            variant='outlined'
                            helperText={touched.asignatura && errors.asignatura}
                            error={Boolean(touched.asignatura && errors.asignatura)}
                            onChange={event => {
                                setMensaje()
                                asignatura.onChange(event)
                            }}
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
                            {...grupo}
                            type='number'
                            label='Grupo'
                            variant='outlined'
                            helperText={touched.grupo && errors.grupo}
                            error={Boolean(touched.grupo && errors.grupo)}
                            onChange={event => {
                                setMensaje()
                                grupo.onChange(event)
                            }}
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
                        {mensaje}
                    </Grid>
                </Grid>
            </Form>
        </FormikProvider>
    )
}

export default GrupoForm;
