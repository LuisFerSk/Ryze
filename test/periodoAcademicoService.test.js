import { isObject } from '../src/utils/specialFunctions';
import { periodoAcademicoAdd, periodoAcademicoUpdate, periodoAcademicoDelete } from '../src/components/periodoAcademico/periodoAcademicoService';

let idPrueba;

const usuario = { titulo: '2020-02', fechaInicio: '2020-01-02', estado: true, fechaFin: '2021-01-02' }

test('agregar periodo academico', () => {
    return periodoAcademicoAdd(usuario).then(result => {
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

test('actualizar periodo academico', () => {
    return periodoAcademicoUpdate(idPrueba, { estado: false }).then(result => {
        expect(result).toEqual(true)

    })
});

test('eliminar periodo academico', () => {
    return periodoAcademicoDelete(idPrueba).then(result => {
        expect(result).toEqual(true)
    })
})
