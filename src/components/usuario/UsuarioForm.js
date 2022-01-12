import { Form, FormikProvider, useFormik } from 'formik'
import {
    Grid,
    Button,
    MenuItem,
    Checkbox,
    TextField,
    FormLabel,
    FormGroup,
    FormControl,
    FormHelperText,
    FormControlLabel,
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'

import { useMensaje } from '../uses'
import { usuarioUpdate, usuarioAdd } from './usuarioService'
import { usuarioInitialValues, usuarioSchema } from './UsuarioSchema'

import { estadosUsuarios as estados } from '../../_mocks_/estados'

import { PROFESOR, ESTUDIANTE } from '../../_mocks_/roles'

const UsuarioForm = ({ id, init, setDocs }) => {
    const [mensaje, setMensaje, mensajeLoader] = useMensaje()

    const formik = useFormik({
        initialValues: id && init ? init : usuarioInitialValues,
        validationSchema: usuarioSchema,
        onSubmit: (values, { resetForm }) => {
            mensajeLoader()

            if (id) {
                usuarioUpdate(id, values).then(result => {
                    if (result === true) {
                        setDocs(old => [...old.filter(row => row.id !== id), { id, data: values }])
                        setMensaje('success', '¡Se ha actualizado el registro correctamente!')
                        return;
                    }
                    console.log(result)
                    setMensaje('error', '¡No se ha podido guardar el registro!')
                })
                return;
            }

            usuarioAdd(values).then(result => {
                if (typeof result === 'object' && result.id) {
                    setDocs(old => [...old, { id: result.id, data: values }])
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

    const email = getFieldProps('email')
    const roles = getFieldProps('roles')
    const cedula = getFieldProps('cedula')
    const estado = getFieldProps('estado')
    const nombres = getFieldProps('nombres')
    const apellidos = getFieldProps('apellidos')

    const onChangeRoles = event => {
        setMensaje()
        roles.onChange(event)
    }

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
                    <Grid item xs={12} md={12} sm={8} lg={8}>
                        <TextField
                            fullWidth
                            {...cedula}
                            type='number'
                            variant='outlined'
                            label='Número de identificación'
                            helperText={touched.cedula && errors.cedula}
                            error={Boolean(touched.cedula && errors.cedula)}
                            onChange={event => {
                                setMensaje()
                                cedula.onChange(event)
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={4} lg={4}>
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
                        <FormControl component='fieldset' error={Boolean(touched.roles && errors.roles)}>
                            <FormLabel component='legend'>Roles</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    {...roles}
                                    value={ESTUDIANTE}
                                    label='Estudiante'
                                    control={<Checkbox />}
                                    onChange={event => onChangeRoles(event)}
                                    checked={Boolean(roles.value.find(element => element === ESTUDIANTE))}
                                />
                                <FormControlLabel
                                    {...roles}
                                    value={PROFESOR}
                                    label='Profesor'
                                    control={<Checkbox />}
                                    onChange={event => onChangeRoles(event)}
                                    checked={Boolean(roles.value.find(element => element === PROFESOR))}
                                />
                            </FormGroup>
                            <FormHelperText>{touched.roles && errors.roles}</FormHelperText>
                        </FormControl>
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