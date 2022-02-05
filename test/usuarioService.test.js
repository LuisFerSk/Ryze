import { PROFESOR } from '../src/_mocks_/roles';
import { usuarioAdd, usuarioUpdate } from '../src/components/usuario/usuarioService';

const data = { identificacion: '1003243688', email: 'correo2@gmail.com', nombres: 'Leonardo Josue', apellidos: 'Rodriguez', estado: false, tipo: PROFESOR }

const { email } = data;

test('agregar usuario', () => {
    return usuarioAdd(data).then(result => {
        expect(result).toEqual(
            expect.objectContaining({
                data: expect.any(Object),
                id: expect.any(String),
            })
        )
    })
});

test('actualizar usuario', () => {
    return usuarioUpdate(email, { nombres: 'Leonardo Jose' },
        result => {
            expect(result).toEqual(true)
        }
    )
});