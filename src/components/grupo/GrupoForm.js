import SaveIcon from '@material-ui/icons/Save'
import { Form, FormikProvider, useFormik } from 'formik'
import { Grid, TextField, Button, MenuItem } from '@material-ui/core'

import { useMensaje, useGetDocs } from '../uses'
import { grupoAdd, grupoUpdate } from './grupoService'
import { grupoInitialValues, grupoSchema } from './GrupoSchema'
import { usuarioGetAllProfesor } from '../usuario/usuarioService'
import { asignaturaGetAll } from '../asignatura/asignaturaService'
import { updateDataInDocumentArray, addDataInDocumentArray, isObject } from '../../utils/specialFunctions'


const GrupoForm = ({ id, init, setDocs }) => {
    const [mensaje, setMensaje, mensajeLoader] = useMensaje()

    const [profesores] = useGetDocs(usuarioGetAllProfesor())

    const [asignaturas] = useGetDocs(asignaturaGetAll())

    const formik = useFormik({
        initialValues: id && init ? init : grupoInitialValues,
        validationSchema: grupoSchema,
        onSubmit: (values, { resetForm }) => {
            mensajeLoader()

            if (id) {
                grupoUpdate(id, values).then(result => {
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

            grupoAdd(values).then(result => {
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

    const numero = getFieldProps('numero')
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
                            {profesores.map((row, index) => {
                                const data = row.data;
                                return (
                                    <MenuItem key={index} value={data.identificacion}>
                                        {`${data.identificacion} - ${data.nombres} ${data.apellidos}`}
                                    </MenuItem>
                                )
                            }
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
                            {asignaturas.map((row, index) => {
                                const data = row.data;
                                return (
                                    <MenuItem key={index} value={data.codigo}>
                                        {`${data.codigo} - ${data.titulo}`}
                                    </MenuItem>
                                )
                            }
                            )}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={12} sm={4} lg={4}>
                        <TextField
                            fullWidth
                            {...numero}
                            type='number'
                            label='Grupo'
                            variant='outlined'
                            helperText={touched.numero && errors.numero}
                            error={Boolean(touched.numero && errors.numero)}
                            onChange={event => {
                                setMensaje()
                                numero.onChange(event)
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
                    <Grid container spacing={0} item xs={12} md={12} sm={12} lg={12} justifyContent='center'>
                        {mensaje}
                    </Grid>
                </Grid>
            </Form>
        </FormikProvider>
    )
}

export default GrupoForm;
