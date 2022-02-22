import SaveIcon from '@material-ui/icons/Save'
import { Form, FormikProvider, useFormik } from 'formik'
import { Grid, TextField, Button, MenuItem } from '@material-ui/core'

import { useMensaje, useGetDocs } from '../uses'
import { grupoAdd, grupoUpdate } from './grupoService'
import { grupoInitialValues, grupoSchema } from './GrupoSchema'
import { usuarioGetAllProfesor } from '../usuario/usuarioService'
import { asignaturaGetAll } from '../asignatura/asignaturaService'
import { periodoAcademicoGetActived } from '../periodoAcademico/periodoAcademicoService'
import { updateDataInDocumentArray, addDataInDocumentArray, isObject } from '../../utils/specialFunctions'
import { useEffect } from 'react';
import useFormikError from './../uses/useFormikError';


const GrupoForm = ({ id, init, setDocs }) => {
    const [mensaje, setMensaje, mensajeLoader] = useMensaje()

    const [profesores] = useGetDocs(usuarioGetAllProfesor())

    const [asignaturas] = useGetDocs(asignaturaGetAll())

    const [periodosAcademicos] = useGetDocs(periodoAcademicoGetActived())

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

            const data = { ...values, estado: true }

            grupoAdd(data).then(result => {
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

    const [getHelperTextField, getErrorFiled] = useFormikError(touched, errors)


    useEffect(() => {
        setMensaje()
        // eslint-disable-next-line
    }, [values])

    return (
        <FormikProvider value={formik}>
            <Form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} sm={8} lg={8}>
                        <TextField
                            select
                            fullWidth
                            {...getFieldProps('profesor')}
                            label='Profesor'
                            variant='outlined'
                            helperText={getHelperTextField('profesor')}
                            error={getErrorFiled('profesor')}
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
                    <Grid item xs={12} md={12} sm={4} lg={4}>
                        <TextField
                            select
                            fullWidth
                            {...getFieldProps('periodo')}
                            variant='outlined'
                            label='Periodo academico'
                            helperText={getHelperTextField('periodo')}
                            error={getErrorFiled('periodo')}
                        >
                            {periodosAcademicos.map((row, index) => {
                                const data = row.data;
                                return (
                                    <MenuItem key={index} value={data.titulo}>
                                        {data.titulo}
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
                            {...getFieldProps('asignatura')}
                            label='Asignatura'
                            variant='outlined'
                            helperText={getHelperTextField('asignatura')}
                            error={getErrorFiled('asignatura')}
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
                            {...getFieldProps('numero')}
                            type='number'
                            label='Grupo'
                            variant='outlined'
                            helperText={getHelperTextField('numero')}
                            error={getErrorFiled('numero')}
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
        </FormikProvider >
    )
}

export default GrupoForm;
