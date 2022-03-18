import SaveIcon from '@material-ui/icons/Save'
import { Form, FormikProvider, useFormik } from 'formik'
import { Grid, TextField, Button, MenuItem } from '@material-ui/core'

import { useMensaje } from '../uses'
import estados from '../../_mocks_/estados'
import PeriodoAcademicoTitulo from './PeriodoAcademicoTitulo'
import { periodoAcademicoAdd, periodoAcademicoUpdate } from './periodoAcademicoService'
import { peridoAcademicoSchema, peridoAcademicoInitialValues } from './PeriodoAcademicoSchema'
import { updateDataInDocumentArray, addInArray, isObject } from '../../utils/specialFunctions'

const PeriodoAcademicoForm = ({ id, init, setDocs }) => {
    const [mensaje, setMensaje, mensajeLoader] = useMensaje()

    const formik = useFormik({
        initialValues: id && init ? init : peridoAcademicoInitialValues,
        validationSchema: peridoAcademicoSchema,
        onSubmit: (data, { resetForm }) => {
            mensajeLoader()

            if (id) {
                periodoAcademicoUpdate(id, data).then(result => {
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

            periodoAcademicoAdd(data)
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

    const { errors, touched, handleSubmit, getFieldProps } = formik;

    const titulo = getFieldProps('titulo')
    const estado = getFieldProps('estado')
    const fechaFin = getFieldProps('fechaFin')
    const fechaInicio = getFieldProps('fechaInicio')

    return (
        <FormikProvider value={formik} >
            <Form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                            fullWidth
                            {...titulo}
                            variant='outlined'
                            label='Periodo academico'
                            helperText={touched.titulo && errors.titulo}
                            error={Boolean(touched.titulo && errors.titulo)}
                            InputProps={{
                                inputComponent: PeriodoAcademicoTitulo,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={e => {
                                setMensaje()
                                titulo.onChange(e)
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                            select
                            fullWidth
                            {...estado}
                            label='Estado'
                            variant='outlined'
                            helperText={touched.estado && errors.estado}
                            error={Boolean(touched.estado && errors.estado)}
                            onChange={e => {
                                setMensaje()
                                estado.onChange(e)
                            }}
                        >
                            {estados.map((row, index) =>
                                <MenuItem key={index} value={row.value}>
                                    {row.label}
                                </MenuItem>
                            )}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                            fullWidth
                            type='date'
                            {...fechaInicio}
                            variant='outlined'
                            label='Fecha de inicio'
                            helperText={touched.fechaInicio && errors.fechaInicio}
                            error={Boolean(touched.fechaInicio && errors.fechaInicio)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={e => {
                                setMensaje()
                                fechaInicio.onChange(e)
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                            fullWidth
                            type='date'
                            {...fechaFin}
                            variant='outlined'
                            label='Fecha de finalización'
                            helperText={touched.fechaFin && errors.fechaFin}
                            error={Boolean(touched.fechaFin && errors.fechaFin)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={e => {
                                setMensaje()
                                fechaFin.onChange(e)
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <Button
                            type='submit'
                            variant='outlined'
                            startIcon={<SaveIcon />}
                            color={init ? 'info' : 'primary'}
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

export default PeriodoAcademicoForm;
