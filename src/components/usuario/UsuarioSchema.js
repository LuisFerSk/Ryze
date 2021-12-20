import { useFormik } from 'formik'
import { useMensaje } from '../uses'
import usuarioService from './usuarioService'
import CircularIndeterminate from '../shared/Progress'
import { object, string, boolean, number, array } from 'yup'

const usuarioSchema = object().shape({
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

	estado: boolean()
		.required('El estado es requerido'),

	roles: array()
		.min(1, 'Debe selecionar al menos un rol')
		.max(3, 'No se permite más de 3 roles')
		.oneOf(['estudiante','profesor','administrador'],'Los roles que elijio no son validos')
		.required('Este campo es requerido'),

})

const usuarioInitialValues = {
	email: '',
	roles: [],
	cedula: '',
	estado: '',
	nombres: '',
	apellidos: '',
}

const Schema = ({ id, init, setDocs }) => {
	const [mensaje, setMensaje] = useMensaje()

	const formik = useFormik({
		initialValues: id && init ? init : usuarioInitialValues,
		validationSchema: usuarioSchema,
		onSubmit: (values, { resetForm }) => {
			setMensaje(<CircularIndeterminate />)
			if (id) {
				usuarioService.Update(id, values).then(result => {
					if (result === true) {
						setDocs(old => [...old.filter(row => row.id !== id), { id, data: values }])
						setMensaje('success', '¡Se ha actualizado el registro correctamente!')
						return;
					}
					console.log(result)
					setMensaje('error', '¡No se ha podido guardar el registro!')
				})
				return;
			}
			usuarioService.Add(values)
				.then(result => {
					if (typeof result === 'object' && result.id) {
						setDocs(old => [...old, { id: result.id, data: values }])
						resetForm()
						setMensaje('success', '¡Se ha guardado el registro correctamente!')
						return;
					}
					console.log(result)
					setMensaje('error', '¡No se ha podido guardar el registro!')
				})
		}
	})

	return [mensaje, setMensaje, formik]
}

export default Schema;