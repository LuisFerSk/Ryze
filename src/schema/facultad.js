import { object, string, boolean } from 'yup';

export const facultadSchema = object().shape({
    titulo: string()
        .min(5, 'Minimo 5 caracteres')
        .max(30, 'maximo 30 caracteres')
        .required('El titulo es requerido'),

    estado: boolean()
        .required('El estado es requerido'),
});

export const facultadInitialValues = {
    titulo: '',
    estado: '',
}