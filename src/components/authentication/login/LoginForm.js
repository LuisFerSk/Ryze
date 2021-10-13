import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';

import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';

import { Stack, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('El correo electrónico debe ser una dirección de correo electrónico válida')
      .required('El correo es requerido'),
    password: Yup.string().required('La contraseña es requerida')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Correo electronico"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            label="Contraseña"
            {...getFieldProps('password')}
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            helperText={touched.password && errors.password}
            error={Boolean(touched.password && errors.password)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Iniciar seción
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
