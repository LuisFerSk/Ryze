import SaveIcon from '@material-ui/icons/Save'
import { Form, FormikProvider, useFormik } from 'formik'
import { Grid, TextField, Button, MenuItem } from '@material-ui/core'

import { useMensaje } from '../uses'
import estados from '../../_mocks_/estados'
import { asignaturaUpdate, asignaturaAdd } from './asignaturaService'
import { asignaturaInitialValues, asignaturaSchema } from './AsignaturaSchema'
import { updateDataInDocumentArray, addDataInDocumentArray, isObject } from '../../utils/specialFunctions'

const AsignaturaForm = ({ id, init, setDocs }) => {
    const [mensaje, setMensaje, mensajeLoader] = useMensaje()

    const formik = useFormik({
        initialValues: id && init ? init : asignaturaInitialValues,
        validationSchema: asignaturaSchema,
        onSubmit: (values, { resetForm }) => {
            mensajeLoader()
            if (id) {
                asignaturaUpdate(id, values).then(result => {
                    if (result === true) {
                        setDocs(old => updateDataInDocumentArray(old, id, values))
                        setMensaje('success', '¡Se ha actualizado el registro correctamente!')
                        return;
                    }
                    console.log(result)
                    setMensaje('error', '¡No se ha podido guardar el registro!')
                })
                return;
            }
            asignaturaAdd(values)
                .then(result => {
                    if (isObject(result) && result.id) {
                        setDocs(old => addDataInDocumentArray(old, { id: result.id, data: values }))
                        resetForm()
                        setMensaje('success', '¡Se ha guardado el registro correctamente!')
                        return;
                    }
                    console.log(result)
                    setMensaje('error', '¡No se ha podido guardar el registro!')
                })
        }
    })

    const { errors, touched, handleSubmit, getFieldProps } = formik;

    const titulo = getFieldProps('titulo')
    const estado = getFieldProps('estado')
    const codigo = getFieldProps('codigo')

    return (
        <FormikProvider value={formik}>
            <Form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <TextField
                            fullWidth
                            {...titulo}
                            label='Asignatura'
                            variant='outlined'
                            helperText={touched.titulo && errors.titulo}
                            error={Boolean(touched.titulo && errors.titulo)}
                            onChange={e => {
                                setMensaje()
                                titulo.onChange(e)
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sm={8} lg={8}>
                        <TextField
                            fullWidth
                            {...codigo}
                            label='Codigo'
                            variant='outlined'
                            helperText={touched.codigo && errors.codigo}
                            error={Boolean(touched.codigo && errors.codigo)}
                            onChange={e => {
                                setMensaje()
                                codigo.onChange(e)
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sm={4} lg={4}>
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

export default AsignaturaForm;
