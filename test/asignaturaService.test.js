import { asignaturaAdd, asignaturaUpdate } from '../src/components/asignatura/asignaturaService';

const id = 'IFNHJUWu0ldKFiL4Um7N'

const usuario = { titulo: 'PRUEBA', codigo: '123549', estado: true }

test('agregar asignatura', () => {
    return asignaturaAdd(usuario).then(result => {
        expect(result).toEqual(
            expect.objectContaining({
                data: expect.any(Object),
                id: expect.any(String),
            })
        )
    })
});

test('actualizar asignatura', () => {
    return asignaturaUpdate(id, { codigo: '123456' }).then(result => {
        expect(result).toEqual(true)
    })
});
