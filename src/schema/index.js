import { object, string, date, boolean } from 'yup';

export const loginSchema = object().shape({
    email: string()
        .email('El correo electrónico debe ser una dirección de correo electrónico válida')
        .required('El correo es requerido'),

    password: string()
        .required('La contraseña es requerida')
});

export const loginInitialValues = {
    email: '',
    password: ''
}

//------------------------------------------------------------------

export const peridoAcademicoSchema = object().shape({
    titulo: string()
        .test('len', 'Verifique que el titulo cumpla con el formato Ej: 2020-20', val => val.replace(/\s+/g, '').length === 7)
        .required('El titulo es requerido'),

    estado: boolean()
        .required('El estado es requerido'),

    fechaInicio: date()
        .required('La fecha de inicio es requerida'),

    fechaFin: date()
        .required("La fecha de finalizacion es requerida")
        .when(
            'fechaInicio', (fechaInicio, schema) =>
            schema.test({
                test: fechaFin => !!fechaInicio && fechaFin > fechaInicio,
                message: "La fecha de finalización debe ser mayor que la de inicio"
            })
        )
});

export const peridoAcademicoInitialValues = {
    titulo: ' ',
    estado: '',
    fechaFin: '',
    fechaInicio: '',
}

//------------------------------------------------------------------
