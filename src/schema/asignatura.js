import { object, string, boolean } from 'yup';

export const asignaturaSchema = object().shape({
    titulo: string()
        .min(3, 'Minimo 3 caracteres')
        .max(50, 'maximo 50 caracteres')
        .required('El titulo es requerido'),

    codigo: string()
        .test('len', 'el codigo debe ser de 6 caracteres sin espacios', val => val && val.trim().replace(/\s+/g, '').length === 6)
        .required('El codigo es requerido'),

    estado: boolean()
        .required('El estado es requerido'),
});

export const asignaturaInitialValues = {
    titulo: '',
    codigo: '',
    estado: '',
}