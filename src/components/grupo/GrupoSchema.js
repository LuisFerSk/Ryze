import { object, string, number } from 'yup'

export const grupoSchema = object().shape({
    profesor: string()
        .required('Este campo es requerido'),
    asignatura: string()
        .required('Este campo es requerido'),
    grupo: number()
    .min()
        .required('Este campo es requerido'),
})

export const grupoInitialValues = {
    grupo: '',
    profesor: '',
    asignatura: '',

}
