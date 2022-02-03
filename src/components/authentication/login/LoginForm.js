import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { LoadingButton } from '@material-ui/lab'
import eyeFill from '@iconify/icons-eva/eye-fill'
import eyeOffFill from '@iconify/icons-eva/eye-off-fill'
import { useFormik, Form, FormikProvider } from 'formik'
import { Stack, TextField, IconButton, InputAdornment, Grid } from '@material-ui/core'

import { useMensaje } from '../../uses'
import { isObject } from '../../../utils/specialFunctions'
import { usuarioGetByID } from '../../usuario/usuarioService'
import { loginSchema, loginInitialValues } from './loginSchema'
import { authSignIn, authCreateUser } from '../../../database/auth'
import { FIREBASE_ERROR_NO_ACOUNT } from '../../../_mocks_/firebaseError'

const LoginForm = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const [mensaje, setMensaje, mensajeLoader] = useMensaje()

    const formik = useFormik({
        initialValues: loginInitialValues,
        validationSchema: loginSchema,
        onSubmit: values => {
            mensajeLoader()
            const { email, password } = values;
            usuarioGetByID(email).then(user => {
                if (isObject(user) && user.id) {
                    authSignIn(email, password).then(result => {
                        if (isObject(result) && result.status === 200) {
                            navigate('/dashboard', { replace: true })
                            return;
                        }
                        const { identificacion } = user.data;
                        if (isObject(result) && result.message === FIREBASE_ERROR_NO_ACOUNT && password === identificacion.toString()) {
                            authCreateUser(email, password)
                            return;
                        }
                        setMensaje('error', 'No se ha podido iniciar sesión, verifique su contraseña')
                    })
                    return;
                }
                setMensaje('error', 'No se ha encontrado una cuenta con ese correo')
            })
        }
    })

    const { errors, touched, handleSubmit, getFieldProps } = formik;

    return (
        <FormikProvider value={formik}>
            <Form autoComplete='off' noValidate onSubmit={handleSubmit} >
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        type='email'
                        autoComplete='username'
                        label='Correo electronico'
                        {...getFieldProps('email')}
                        helperText={touched.email && errors.email}
                        error={Boolean(touched.email && errors.email)}
                    />
                    <TextField
                        fullWidth
                        label='Contraseña'
                        {...getFieldProps('password')}
                        autoComplete='current-password'
                        type={showPassword ? 'text' : 'password'}
                        helperText={touched.password && errors.password}
                        error={Boolean(touched.password && errors.password)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton onClick={event => setShowPassword(show => !show)} edge='end'>
                                        <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Grid container spacing={0} item xs={12} md={12} sm={12} lg={12} justifyContent='center'>
                        {mensaje}
                    </Grid>
                    <LoadingButton
                        fullWidth
                        size='large'
                        type='submit'
                        variant='contained'
                    >
                        Iniciar sesión
                    </LoadingButton>
                </Stack>
            </Form>
        </FormikProvider>
    )
}

export default LoginForm;