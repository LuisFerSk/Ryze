import SaveIcon from '@material-ui/icons/Save'
import { Form, FormikProvider, useFormik } from 'formik'
import { Grid, TextField, Button, MenuItem } from '@material-ui/core'

import { useMensaje, useGetDocs } from '../uses'
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

    const numero = getFieldProps('numero')
    const periodo = getFieldProps('periodo')
    const profesor = getFieldProps('profesor')
    const asignatura = getFieldProps('asignatura')

    return (
        <FormikProvider value={formik}>
            <Form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} sm={8} lg={8}>
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
                            {...periodo}
                            variant='outlined'
                            label='Periodo academico'
                            helperText={touched.periodo && errors.periodo}
                            error={Boolean(touched.periodo && errors.periodo)}
                            onChange={event => {
                                setMensaje()
                                periodo.onChange(event)
                            }}
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
                            label='asistencia'
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

export default AsistenciaForm;
