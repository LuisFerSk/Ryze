import CustomTable from "../shared/Table"

import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

import { TableCell } from '@material-ui/core';

import Label from '../Label';
import Modal from "../shared/Modal";
import FacultadForm from "./FacultadForm";
import FacultadDelete from "./FacultadDelete";
import FloatAlert from "../shared/FloatAlert";
import UseFloat from "../shared/float/useFloat";
import TableMoreMenu from "../shared/table/TableMoreMenu";
import { mappingMenuItem } from '../shared/table/TableFunctions';
import { getDataForTable, createOptions } from "../../utils/specialFunctions";

const headLabel = [
    { id: 'titulo', label: 'Facultad', alignRight: false },
    { id: 'estado', label: 'Estado', alignRight: false },
];

const FacultadTable = ({ docs, setDocs }) => {

    const [isOpenModal, openModal, closeModal, contentModal, setContentModal, titleModal, setTitleModal] = UseFloat(false);

    const [isOpenAlert, openAlert, closeAlert, contentAlert] = UseFloat(
        false,
        "¡Se ha eliminado correctamente la facultad!"
    );

    const cells = (row) => {
        const { id, titulo, estado } = row;

        const options = [
            createOptions('Editar', editFill, () => {
                setTitleModal('Actualizar periodo academico');
                setContentModal(
                    <FacultadForm
                        id={id}
                        setDocs={setDocs}
                        init={{ titulo, estado }}
                    />
                );
                openModal();
            }),
            createOptions('Eliminar', trash2Outline, () => {
                setTitleModal('Eliminar periodo academico');
                setContentModal(
                    <FacultadDelete
                        init={row}
                        setDocs={setDocs}
                        openAlert={openAlert}
                        closeModal={closeModal}
                    />
                );
                openModal();
            }),
        ];

        return (
            <>
                <TableCell align="left">{titulo}</TableCell>
                <TableCell align="left">
                    <Label
                        variant="ghost"
                        color={(estado === true && 'success') || 'error'}
                    >
                        {estado === true ? 'Abierto' : 'Cerrado'}
                    </Label>
                </TableCell>
                <TableCell padding="checkbox">
                    <TableMoreMenu>
                        {mappingMenuItem(options)}
                    </TableMoreMenu>
                </TableCell>
            </>
        );
    };

    return (
        <>
            <CustomTable cells={cells} headLabel={headLabel} data={getDataForTable(docs)} selectBy="titulo" searchBy="titulo" />
            <Modal title={titleModal} isOpen={isOpenModal} close={closeModal}>
                {contentModal}
            </Modal>
            <FloatAlert isOpen={isOpenAlert} close={closeAlert}>
                {contentAlert}
            </FloatAlert>
        </>
    );
};

export default FacultadTable;
