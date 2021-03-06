import SaveIcon from '@material-ui/icons/Save'
import { Form, FormikProvider, useFormik } from 'formik'
import { Grid, TextField, Button, MenuItem } from '@material-ui/core'

import { useMensaje, useGetDocs, useFormikFiledProps } from '../uses'
import { grupoGetActivated } from '../grupo/grupoService'
import { usuarioGetAllEstudiante } from '../usuario/usuarioService'
import { matriculaAcademicaAdd, matriculaAcademicaUpdate } from './matriculaAcademicaService'
import { matriculaAcademicaInitialValues, matriculaAcademicaSchema } from './MatriculaAcademicaSchema'
import { updateDataInDocumentArray, addInArray, isObject } from '../../utils/specialFunctions'
import { useEffect } from 'react';

const MatriculaAcademicaForm = ({ id, init, setDocs }) => {
    const [mensaje, setMensaje, mensajeLoader] = useMensaje()

    const [grupos] = useGetDocs(grupoGetActivated())
    const [estudiantes] = useGetDocs(usuarioGetAllEstudiante())

    const formik = useFormik({
        initialValues: id && init ? init : matriculaAcademicaInitialValues,
        validationSchema: matriculaAcademicaSchema,
        onSubmit: (data, { resetForm }) => {
            mensajeLoader()
            if (id) {
                matriculaAcademicaUpdate(id, data).then(result => {
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
            matriculaAcademicaAdd(data).then(result => {
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
                    <Grid item xs={12} md={12} sm={6} lg={6}>
                        <TextField
                            select
                            fullWidth
                            disabled={!id}
                            label='Estudiante'
                            variant='outlined'
                            {...getFieldProps('estudiante')}
                        >
                            {estudiantes.map((row, key) => {
                                const data = row.data;
                                const { identificacion, nombres, apellidos } = data;
                                return (
                                    <MenuItem key={key} value={identificacion}>
                                        {`${identificacion} - ${nombres} ${apellidos}`}
                                    </MenuItem>
                                )
                            }
                            )}
                        </TextField>

                    </Grid>
                    <Grid item xs={12} md={12} sm={6} lg={6}>
                        <TextField
                            select
                            fullWidth
                            label='Grupo'
                            variant='outlined'
                            {...getFieldProps('grupo')}
                        >
                            {grupos.map((row, index) => {
                                const data = row.data;
                                const { asignatura, numero } = data;
                                const grupo = `${asignatura}-${numero}`
                                return (
                                    <MenuItem key={index} value={grupo}>
                                        {grupo}
                                    </MenuItem>
                                )
                            }
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

export default MatriculaAcademicaForm;
