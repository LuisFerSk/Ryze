import { object, string, boolean, number, array } from 'yup'

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

    cedula: number()
        .positive('Tiene que ser un valor positivo')
        .integer('No puede ser un valor decimal')
        .required('Este campo es requerido')
        .test('len', 'El número de identificacion debe ser de 10 caracteres sin espacios', value => value && value.toString().length === 10),

    estado: boolean()
        .required('El estado es requerido'),

    roles: array()
        .min(1, 'Debe selecionar al menos un rol')
        .max(3, 'No se permite más de 3 roles')
        .test('len', 'No se ha seleccionado un rol valido', value => value && value.find(elements => elements === 'estudiante' || elements === 'profesor' || elements === 'administrador'))
        .required('Este campo es requerido'),

})

export const usuarioInitialValues = {
    email: '',
    roles: [],
    cedula: '',
    estado: '',
    nombres: '',
    apellidos: '',
}
