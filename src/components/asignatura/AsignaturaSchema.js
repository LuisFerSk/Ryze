import { useFormik } from 'formik'
import { useMensaje } from '../uses'
import {asignaturaUpdate,asignaturaAdd} from './asignaturaService'
import { object, string, boolean } from 'yup'

const asignaturaSchema = object().shape({
    titulo: string()
        .min(3, 'Minimo 3 caracteres')
        .max(50, 'maximo 50 caracteres')
        .required('El titulo es requerido'),

    codigo: string()
        .required('El codigo es requerido')
        .test('len', 'el codigo debe ser de 6 caracteres sin espacios', val => val && val.trim().replace(/\s+/g, '').length === 6),

    estado: boolean()
        .required('El estado es requerido'),
})

const asignaturaInitialValues = {
    titulo: '',
    codigo: '',
    estado: '',
}

const Schema = ({ id, init, setDocs }) => {
    const [mensaje, setMensaje] = useMensaje()

    const formik = useFormik({
        initialValues: id && init ? init : asignaturaInitialValues,
        validationSchema: asignaturaSchema,
        onSubmit: (values, { resetForm }) => {
            setMensaje()

            if (id) {
                asignaturaUpdate(id, values).then(result => {
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
            asignaturaAdd(values)
                .then(result => {
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

    return [mensaje, setMensaje, formik]
}

export default Schema