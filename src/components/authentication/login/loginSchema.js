import { object, string } from 'yup'

export const loginSchema = object().shape({
    email: string()
        .email('El correo electrónico debe ser una dirección de correo electrónico válida')
        .required('El correo es requerido'),

    password: string()
        .test('len', 'La contraseña tiene un maximo de 250 caracteres', val => val && val.replace(/\s+/g, '').length < 250)
        .required('La contraseña es requerida')
})

export const loginInitialValues = {
    email: '',
    password: ''
}