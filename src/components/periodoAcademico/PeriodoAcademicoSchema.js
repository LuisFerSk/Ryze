import { useFormik } from 'formik'
import { useMensaje } from '../uses'
import { object, string, date, boolean } from 'yup'

import { isObject } from '../../utils/specialFunctions'
import periodoAcademicoService from './periodoAcademicoService'

const peridoAcademicoSchema = object().shape({
    titulo: string()
        .test('len', 'Verifique que el titulo cumpla con el formato Ej: 2020-20', val => val && val.replace(/\s+/g, '').length === 7),

    estado: boolean()
        .required('El estado es requerido'),

    fechaInicio: date()
        .required('La fecha de inicio es requerida'),

    fechaFin: date()
        .required('La fecha de finalizacion es requerida')
        .when(
            'fechaInicio', (fechaInicio, schema) =>
            schema.test({
                test: fechaFin => !!fechaInicio && fechaFin > fechaInicio,
                message: 'La fecha de finalización debe ser mayor que la de inicio'
            })
        )
})

const peridoAcademicoInitialValues = {
    titulo: '',
    estado: '',
    fechaFin: '',
    fechaInicio: '',
}

const Schema = ({ id, init, setDocs }) => {
    const [mensaje, setMensaje, mensajeLoader] = useMensaje()

    const formik = useFormik({
        initialValues: id && init ? init : peridoAcademicoInitialValues,
        validationSchema: peridoAcademicoSchema,
        onSubmit: (values, { resetForm }) => {
            mensajeLoader()

            if (id) {
                periodoAcademicoService.Update(id, values).then(result => {
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

            periodoAcademicoService.Add(values)
                .then(result => {
                    if (isObject(result) && result.id) {
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

    return [mensaje, setMensaje, formik]
}

export default Schema
