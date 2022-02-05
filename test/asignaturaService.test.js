import { isObject } from '../src/utils/specialFunctions';
import { asignaturaAdd, asignaturaUpdate, asignaturaDelete } from '../src/components/asignatura/asignaturaService';

let idPrueba;

const usuario = { titulo: 'PRUEBA', codigo: '123549', estado: true }

test('agregar asignatura', () => {
    return asignaturaAdd(usuario).then(result => {
        if (isObject(result)) {
            const { id } = result;
            if (id) {
                idPrueba = id
            }
        }

        expect(result).toEqual(
            expect.objectContaining({
                id: expect.any(String),
            })
        )
    })
});

test('actualizar asignatura', () => {
    return asignaturaUpdate(idPrueba, { codigo: '123456' }).then(result => {
        expect(result).toEqual(true)
    })
});

test('eliminar asignatura', () => {
    return asignaturaDelete(idPrueba).then(result => {
        expect(result).toEqual(true)
    })
})
