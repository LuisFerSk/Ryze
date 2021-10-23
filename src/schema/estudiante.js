import { object, string, boolean, number } from 'yup';

export const estudianteSchema = object().shape({
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
        .test('len', 'el número de identificacion debe ser de 10 caracteres sin espacios', val => val && val.toString().length === 10),

    programa: string()
        .required('El programa es requerido'),

    estado: boolean()
        .required('El estado es requerido'),
});

export const estudianteInitialValues = {
    email: '',
    cedula: '',
    estado: '',
    nombres: '',
    programa: '',
    apellidos: '',
}