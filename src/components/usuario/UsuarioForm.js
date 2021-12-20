import { Form, FormikProvider } from 'formik'
import {
	Grid,
	Button,
	MenuItem,
	Checkbox,
	TextField,
	FormLabel,
	FormGroup,
	FormControl,
	FormControlLabel,
} from '@material-ui/core'

import SaveIcon from '@material-ui/icons/Save'

import UsuarioSchema from './UsuarioSchema'
import { estadosUsuarios as estados } from '../../_mocks_/estados'

const UsuarioForm = (props) => {
	const [mensaje, setMensaje, formik] = UsuarioSchema({ ...props })

	const { init } = props;

	const { errors, touched, handleSubmit, getFieldProps } = formik;

	const email = getFieldProps('email')
	const roles = getFieldProps('roles')
	const cedula = getFieldProps('cedula')
	const estado = getFieldProps('estado')
	const nombres = getFieldProps('nombres')
	const apellidos = getFieldProps('apellidos')

	console.log(touched.roles)
	console.log(errors.roles)
	console.log(roles)

	return (
		<FormikProvider value={formik}>
			<Form noValidate autoComplete='off' onSubmit={handleSubmit}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={12} sm={6} lg={6}>
						<TextField
							fullWidth
							{...nombres}
							label='Nombres'
							variant='outlined'
							helperText={touched.nombres && errors.nombres}
							error={Boolean(touched.nombres && errors.nombres)}
							onChange={e => {
								setMensaje()
								nombres.onChange(e)
							}}
						/>
					</Grid>
					<Grid item xs={12} md={12} sm={6} lg={6}>
						<TextField
							fullWidth
							{...apellidos}
							label='Apellidos'
							variant='outlined'
							helperText={touched.apellidos && errors.apellidos}
							error={Boolean(touched.apellidos && errors.apellidos)}
							onChange={e => {
								setMensaje()
								apellidos.onChange(e)
							}}
						/>
					</Grid>
					<Grid item xs={12} md={12} sm={12} lg={12}>
						<TextField
							fullWidth
							{...email}
							type='email'
							label='Email'
							variant='outlined'
							helperText={touched.email && errors.email}
							error={Boolean(touched.email && errors.email)}
							onChange={e => {
								setMensaje()
								email.onChange(e)
							}}
						/>
					</Grid>
					<Grid item xs={12} md={12} sm={8} lg={8}>
						<TextField
							fullWidth
							{...cedula}
							type='number'
							variant='outlined'
							label='Número de identificación'
							helperText={touched.cedula && errors.cedula}
							error={Boolean(touched.cedula && errors.cedula)}
							onChange={e => {
								setMensaje()
								cedula.onChange(e)
							}}
						/>
					</Grid>
					<Grid item xs={12} md={12} sm={4} lg={4}>
						<TextField
							select
							fullWidth
							label='Estado'
							{...estado}
							variant='outlined'
							helperText={touched.estado && errors.estado}
							error={Boolean(touched.estado && errors.estado)}
							onChange={e => {
								setMensaje()
								estado.onChange(e)
							}}
						>
							{estados.map((row, index) =>
								<MenuItem key={index} value={row.value}>
									{row.label}
								</MenuItem>
							)}
						</TextField>
					</Grid>
					<Grid item xs={12} md={12} sm={12} lg={12}>
						<FormControl component='fieldset'>
							<FormLabel component='legend'>Roles</FormLabel>
							<FormGroup>
								<FormControlLabel
									{...roles}
									value='estudiante'
									label='Estudiante'
									control={<Checkbox />}
								/>
								<FormControlLabel
									{...roles}
									value='profesor'
									label='Profesor'
									control={<Checkbox />}
								/>
								<FormControlLabel
									{...roles}
									value='administrador'
									label='Administrador'
									control={<Checkbox />}
								/>
							</FormGroup>
						</FormControl>
					</Grid>
					<Grid item xs={12} md={12} sm={12} lg={12}>
						<Button
							type='submit'
							color='primary'
							variant='outlined'
							startIcon={<SaveIcon />}
						>
							{init ? 'Actualizar' : 'Registrar'}
						</Button>
					</Grid>
					<Grid item xs={12} md={12} sm={12} lg={12}>
						{mensaje}
					</Grid>
				</Grid>
			</Form>
		</FormikProvider>
	)
}

export default UsuarioForm;
