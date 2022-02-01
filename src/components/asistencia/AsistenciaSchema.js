import { object, string, number } from 'yup'

export const asistenciaSchema = object().shape({
    profesor: string()
        .required('Este campo es requerido'),

    periodo: string()
        .required('Este campo es requerido'),

    asignatura: string()
        .required('Este campo es requerido'),

    numero: number()
        .max(99, 'Maximo 2 digitos')
        .required('Este campo es requerido'),
})

export const asistenciaInitialValues = {
    numero: '',
    periodo: '',
    profesor: '',
    asignatura: '',
}
