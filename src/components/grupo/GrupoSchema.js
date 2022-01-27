import { object, string, number } from 'yup'

export const grupoSchema = object().shape({
    profesor: string()
        .required('Este campo es requerido'),

    asignatura: string()
        .required('Este campo es requerido'),

    numero: number()
        .max(2, 'Maximo 2 digitos')
        .required('Este campo es requerido'),
})

export const grupoInitialValues = {
    numero: '',
    profesor: '',
    asignatura: '',
}
