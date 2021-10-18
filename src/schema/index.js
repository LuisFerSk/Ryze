import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('El correo electrónico debe ser una dirección de correo electrónico válida')
        .required('El correo es requerido'),
    password: Yup.string().required('La contraseña es requerida')
});

export const loginInitialValues = {
    email: '',
    password: ''
}

//------------------------------------------------------------------