import { object, string, boolean } from 'yup';

export const programaSchema = object().shape({
    titulo: string()
        .min(5, 'Minimo 5 caracteres')
        .max(30, 'maximo 30 caracteres')
        .required('El titulo es requerido'),

    idFacultad: string()
        .required('La facultad es requerida'),

    estado: boolean()
        .required('El estado es requerido'),
});

export const programaInitialValues = {
    titulo: '',
    estado: '',
    idFacultad: '',
}