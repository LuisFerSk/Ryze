import { useEffect } from 'react'

import SaveIcon from '@material-ui/icons/Save'
import { Form, FormikProvider, useFormik } from 'formik'
import { Grid, TextField, Button, MenuItem } from '@material-ui/core'

import { useMensaje, useGetDocs, useFormikError } from '../uses'
import { asignaturaGetAll } from '../asignatura/asignaturaService'
import { usuarioGetAllEstudiante } from '../usuario/usuarioService'
import { asistenciaAdd, asistenciaUpdate } from './AsistenciaService'
import { asistenciaInitialValues, asistenciaSchema } from './AsistenciaSchema'
import { periodoAcademicoGetActived } from '../periodoAcademico/periodoAcademicoService'
import { updateDataInDocumentArray, addDataInDocumentArray, isObject } from '../../utils/specialFunctions'

const AsistenciaForm = ({ id, init, setDocs }) => {
    const [mensaje, setMensaje, mensajeLoader] = useMensaje()

    const [estudiantes] = useGetDocs(usuarioGetAllEstudiante())

    const [asignaturas] = useGetDocs(asignaturaGetAll())

    const [periodosAcademicos] = useGetDocs(periodoAcademicoGetActived())

    const formik = useFormik({
        initialValues: id && init ? init : asistenciaInitialValues,
        validationSchema: asistenciaSchema,
        onSubmit: (values, { resetForm }) => {
            mensajeLoader()
            if (id) {
                asistenciaUpdate(id, values).then(result => {
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

            asistenciaAdd(data).then(result => {
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
                            label='Profesor'
                            variant='outlined'
                            {...getFieldProps('profesor')}
                            error={getErrorFiled('profesor')}
                            helperText={getHelperTextField('profesor')}
                        >
                            {estudiantes.map((row, index) => {
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
                            variant='outlined'
                            label='Periodo academico'
                            {...getFieldProps('periodo')}
                            error={getErrorFiled('periodo')}
                            helperText={getHelperTextField('periodo')}
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
                            label='Asignatura'
                            variant='outlined'
                            {...getFieldProps('asignatura')}
                            error={getErrorFiled('asignatura')}
                            helperText={getHelperTextField('asignatura')}
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
                            type='number'
                            label='asistencia'
                            variant='outlined'
                            {...getFieldProps('numero')}
                            error={getErrorFiled('numero')}
                            helperText={getHelperTextField('numero')}
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

export default AsistenciaForm;
