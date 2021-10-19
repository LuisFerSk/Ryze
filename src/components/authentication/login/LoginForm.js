import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';

import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';

import { LoadingButton } from '@material-ui/lab';
import { Stack, TextField, IconButton, InputAdornment } from '@material-ui/core';

import { authSignIn } from '../../../database/auth';
import { loginSchema, loginInitialValues } from '../../../schema';

const LoginForm = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

	const formik = useFormik({
		initialValues: loginInitialValues,
		validationSchema: loginSchema,
		onSubmit: (values) => {
			authSignIn(values.email, values.password)
				.then(result => result === 200 ? navigate('/dashboard', { replace: true }) : console.log(result));
		}
	});

	const { errors, touched, handleSubmit, getFieldProps } = formik;

	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit} >
				<Stack spacing={3}>
					<TextField
						fullWidth
						type="email"
						autoComplete="username"
						label="Correo electronico"
						{...getFieldProps('email')}
						helperText={touched.email && errors.email}
						error={Boolean(touched.email && errors.email)}
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
									<IconButton onClick={(e) => setShowPassword((show) => !show)} edge="end">
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
				>
					Iniciar seción
				</LoadingButton>
			</Form>
		</FormikProvider>
	);
}

export default LoginForm;