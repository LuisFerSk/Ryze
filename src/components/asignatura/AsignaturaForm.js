import { useEffect } from 'react'
import SaveIcon from '@material-ui/icons/Save'
import { Form, FormikProvider, useFormik } from 'formik'
import { Grid, TextField, Button, MenuItem } from '@material-ui/core'

import { useMensaje, useFormikFiledProps } from '../uses'
import estados from '../../_mocks_/estados'
import { asignaturaUpdate, asignaturaAdd } from './asignaturaService'
import { asignaturaInitialValues, asignaturaSchema } from './AsignaturaSchema'
import { updateDataInDocumentArray, addInArray, isObject } from '../../utils/specialFunctions'

const AsignaturaForm = ({ id, init, setDocs }) => {
    const [mensaje, setMensaje, mensajeLoader] = useMensaje()

    const formik = useFormik({
        initialValues: id && init ? init : asignaturaInitialValues,
        validationSchema: asignaturaSchema,
        onSubmit: (data, { resetForm }) => {
            mensajeLoader()
            if (id) {
                asignaturaUpdate(id, data).then(result => {
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
            asignaturaAdd(data)
                .then(result => {
                    if (isObject(result) && result.id) {
                        setDocs(old => addInArray(old, { id: result.id, data }))
                        resetForm()
                        setMensaje('success', '¡Se ha guardado el registro correctamente!')
                        return;
                    }
                    console.log(result)
                    setMensaje('error', '¡No se ha podido guardar el registro!')
                })
        }
    })

    const { errors, touched, handleSubmit, values } = formik;

    const getFieldProps = useFormikFiledProps({
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
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <TextField
                            fullWidth
                            label='Asignatura'
                            variant='outlined'
                            {...getFieldProps('titulo')}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sm={8} lg={8}>
                        <TextField
                            fullWidth
                            label='Codigo'
                            variant='outlined'
                            {...getFieldProps('codigo')}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sm={4} lg={4}>
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

export default AsignaturaForm;
