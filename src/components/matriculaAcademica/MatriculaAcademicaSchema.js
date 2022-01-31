import { object, string } from 'yup'

export const matriculaAcademicaSchema = object().shape({
    estudiante: string()
        .required('Este campo es requerido'),

    grupo: string()
        .required('Este campo es requerido'),
})

export const matriculaAcademicaInitialValues = {
    grupo: '',
    estudiante: '',
}
