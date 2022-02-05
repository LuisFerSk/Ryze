
import { PROFESOR } from '../src/_mocks_/roles';
import { authSignIn, authCreateUser } from '../src/database/auth';

const data = { identificacion: '1003243688', email: 'correo2@gmail.com', nombres: 'Leonardo Josue', apellidos: 'Rodriguez', estado: false, tipo: PROFESOR }

const { email, identificacion } = data;


test('crear cuenta', () => {
    return authCreateUser(email, identificacion).then(result => {
        expect(result).toEqual(true)
    })
})

test('login', () => {
    return authSignIn('prueba@gmail.com', 1234567890).then(result => {
        expect(result).toEqual(
            expect.objectContaining({
                status: 200,
                result: 'Se inicio sesión correctamente',
            })
        )
    })
})