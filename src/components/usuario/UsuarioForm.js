import { useEffect } from 'react'

import { Form, FormikProvider, useFormik } from 'formik'
import {
    Grid,
    Button,
    MenuItem,
    TextField,
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'

import { TextFieldOutlined } from '../shared'
import { useMensaje, useFormikFiledProps } from '../uses'
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
                usuarioUpdate(id, data,
                    result => {
                        if (result === true) {
                            setDocs(old => updateDataInDocumentArray(old, id, data))
                            setMensaje('success', '¡Se ha actualizado el registro correctamente!')
                            return;
                        }
                        console.log(result)
                        setMensaje('error', '¡No se ha podido guardar el registro!')
                    }
                )
                return;
            }
            usuarioAdd(data,
                result => {
                    if (isObject(result) && result.id) {
                        setDocs(old => addDataInDocumentArray(old, { id: result.id, data }))
                        resetForm()
                        setMensaje('success', '¡Se ha guardado el registro correctamente!')
                        return;
                    }
                    console.log(result)
                    setMensaje('error', '¡No se ha podido guardar el registro!')
                }
            )
        }
    })

    const { errors, touched, handleSubmit, values } = formik;

    const [getFieldProps] = useFormikFiledProps({
        errors,
        touched,
        getFieldPropsFormik: formik.getFieldProps
    })

    useEffect(() => {
        setMensaje()
        // eslint-disable-next-line
    }, [values])

    return (
        <FormikProvider value={formik}>
            <Form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} sm={6} lg={6}>
                        <TextFieldOutlined
                            label='Nombres'
                            {...getFieldProps('nombres')}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={6} lg={6}>
                        <TextFieldOutlined
                            label='Apellidos'
                            {...getFieldProps('apellidos')}
                        />
                    </Grid>
                    {!id && !init ?
                        <Grid item xs={12} md={12} sm={12} lg={12}>
                            <TextFieldOutlined
                                type='email'
                                label='Email'
                                {...getFieldProps('email')}
                            />
                        </Grid>
                        :
                        null
                    }
                    <Grid item xs={12} md={12} sm={6} lg={6}>
                        <TextFieldOutlined
                            type='number'
                            label='Número de identificación'
                            {...getFieldProps('identificacion')}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={4} lg={4}>
                        <TextField
                            select
                            fullWidth
                            variant='outlined'
                            label='Tipo de usuario'
                            {...getFieldProps('tipo')}
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
                            label='Estado'
                            variant='outlined'
                            {...getFieldProps('estado')}
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