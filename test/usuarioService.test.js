import { usuarioAdd, usuarioUpdate } from '../src/components/usuario/usuarioService';
import { authSignIn } from '../src/database/auth';

const id = 'Fi5tZnZcnoh7Y948V5eT4fNqMmA2'

const usuario = { identificacion: '1003243688', email: 'correo2@gmail.com', nombres: 'Leonardo Josue', apellidos: 'Rodriguez', estado: false }

test('agregar usuario', () => {
    return usuarioAdd(usuario).then(result => {
        expect(result).toEqual(
            expect.objectContaining({
                data: expect.any(Object),
                id: expect.any(String),
            })
        )
    })
});

test('actualizar usuario', () => {
    return usuarioUpdate(id, { nombres: 'Leonardo Jose' }).then(result => {
        expect(result).toEqual(true)
    })
});

test('login', () => {
    return authSignIn('prueba@gmail.com', '1003243681').then(result => {
        expect(result).toEqual(
            expect.objectContaining({
                status: expect.any(Object),
                result: expect.any(String),
            })
        )
    })
})

test('crear cuenta', () => {
    
})