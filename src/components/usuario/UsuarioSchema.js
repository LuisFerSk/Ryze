import { object, string, boolean, number } from 'yup'
import { ESTUDIANTE, PROFESOR } from '../../_mocks_/roles'

export const usuarioSchema = object().shape({
    nombres: string()
        .min(3, 'Minimo 3 caracteres')
        .max(30, 'Maximo 30 caracteres')
        .required('Este campo es requerido'),

    apellidos: string()
        .min(3, 'Minimo 3 caracteres')
        .max(30, 'Maximo 30 caracteres')
        .required('Este campo es requerido'),

    email: string()
        .email('El correo electrónico debe ser una dirección de correo electrónico válida')
        .required('El correo es requerido'),

    identificacion: number()
        .positive('Tiene que ser un valor positivo')
        .integer('No puede ser un valor decimal')
        .required('Este campo es requerido')
        .test('len', 'El número de identificacion debe ser de 10 caracteres sin espacios', value => value && value.toString().length === 10),

    estado: boolean()
        .required('El estado es requerido'),

    tipo: string()
        .test('len', 'No se ha seleccionado una opción', value => value && (value === ESTUDIANTE || value === PROFESOR))

})

export const usuarioInitialValues = {
    tipo: '',
    email: '',
    estado: '',
    nombres: '',
    apellidos: '',
    identificacion: '',
}
