import { Form, FormikProvider, useFormik } from 'formik'
import {
    Grid,
    Button,
    MenuItem,
    TextField,
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'

import { useMensaje } from '../uses'
import { PROFESOR, ESTUDIANTE } from '../../_mocks_/roles'
import { usuarioUpdate, usuarioAdd } from './usuarioService'
import { estadosUsuarios as estados } from '../../_mocks_/estados'
import { usuarioInitialValues, usuarioSchema } from './UsuarioSchema'
import { addDataInDocumentArray, updateDataInDocumentArray, isObject } from '../../utils/specialFunctions'

const tipos = [PROFESOR, ESTUDIANTE]

const UsuarioForm = ({ id, init, setDocs }) => {
    const [mensaje, setMensaje, mensajeLoader] = useMensaje()

    const formik = useFormik({
        initialValues: id && init ? init : usuarioInitialValues,
        validationSchema: usuarioSchema,
        onSubmit: (data, { resetForm }) => {
            mensajeLoader()
            if (id) {
                usuarioUpdate(id, data).then(result => {
                    if (result === true) {
                        setDocs(old => updateDataInDocumentArray(old, id, data))
                        setMensaje('success', '¡Se ha actualizado el registro correctamente!')
                        return;
                    }
                    console.log(result)
                    setMensaje('error', '¡No se ha podido guardar el registro!')
                })
                return;
            }

            usuarioAdd(data).then(result => {
                if (isObject(result) && result.id) {
                    setDocs(old => addDataInDocumentArray(old, { id: result.id, data }))
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

    const tipo = getFieldProps('tipo')
    const email = getFieldProps('email')
    const estado = getFieldProps('estado')
    const nombres = getFieldProps('nombres')
    const apellidos = getFieldProps('apellidos')
    const identificacion = getFieldProps('identificacion')

    return (
        <FormikProvider value={formik}>
            <Form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} sm={6} lg={6}>
                        <TextField
                            fullWidth
                            {...nombres}
                            label='Nombres'
                            variant='outlined'
                            helperText={touched.nombres && errors.nombres}
                            error={Boolean(touched.nombres && errors.nombres)}
                            onChange={event => {
                                setMensaje()
                                nombres.onChange(event)
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={6} lg={6}>
                        <TextField
                            fullWidth
                            {...apellidos}
                            label='Apellidos'
                            variant='outlined'
                            helperText={touched.apellidos && errors.apellidos}
                            error={Boolean(touched.apellidos && errors.apellidos)}
                            onChange={event => {
                                setMensaje()
                                apellidos.onChange(event)
                            }}
                        />
                    </Grid>
                    {!id && !init && <Grid item xs={12} md={12} sm={12} lg={12}>
                        <TextField
                            fullWidth
                            {...email}
                            type='email'
                            label='Email'
                            variant='outlined'
                            helperText={touched.email && errors.email}
                            error={Boolean(touched.email && errors.email)}
                            onChange={event => {
                                setMensaje()
                                email.onChange(event)
                            }}
                        />
                    </Grid>}
                    <Grid item xs={12} md={12} sm={6} lg={6}>
                        <TextField
                            fullWidth
                            {...identificacion}
                            type='number'
                            variant='outlined'
                            label='Número de identificación'
                            helperText={touched.identificacion && errors.identificacion}
                            error={Boolean(touched.identificacion && errors.identificacion)}
                            onChange={event => {
                                setMensaje()
                                identificacion.onChange(event)
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={4} lg={4}>
                        <TextField
                            select
                            fullWidth
                            {...tipo}
                            variant='outlined'
                            label='Tipo de usuario'
                            helperText={touched.tipo && errors.tipo}
                            error={Boolean(touched.tipo && errors.tipo)}
                            onChange={event => {
                                setMensaje()
                                tipo.onChange(event)
                            }}
                        >
                            {tipos.map((row, index) =>
                                <MenuItem key={index} value={row}>
                                    {row}
                                </MenuItem>
                            )}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={12} sm={2} lg={2}>
                        <TextField
                            select
                            fullWidth
                            {...estado}
                            label='Estado'
                            variant='outlined'
                            helperText={touched.estado && errors.estado}
                            error={Boolean(touched.estado && errors.estado)}
                            onChange={event => {
                                setMensaje()
                                estado.onChange(event)
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
                    <Grid container spacing={0} item xs={12} md={12} sm={12} lg={12} justifyContent='center'>
                        {mensaje}
                    </Grid>
                </Grid>
            </Form>
        </FormikProvider>
    )
}

export default UsuarioForm;