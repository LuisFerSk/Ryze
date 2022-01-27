import { usuarioAdd } from '../usuarioService'

const usuario = { identificacion: '1003243682', email: 'correo1@gmail.com', nombres: 'Leonardo Jose', apellidos: 'Rodriguez Camargo', estado: false }

test('agregar usuario', () => {
    return usuarioAdd(usuario).then(result => {

    })
});