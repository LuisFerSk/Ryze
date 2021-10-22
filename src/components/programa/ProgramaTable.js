import CustomTable from "../shared/Table"

import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

import { MenuItem, ListItemIcon, TableCell, ListItemText } from '@material-ui/core';

import Label from '../Label';
import { useFloat } from "../uses";
import Modal from "../shared/Modal";
import ProgramaForm from './ProgramaForm';
import FloatAlert from "../shared/FloatAlert";
import ProgramaDelete from './ProgramaDelete';
import TableMoreMenu from "../shared/table/TableMoreMenu";
import { getDataForTable, createOptions } from '../../utils/specialFunctions';

const headLabel = [
    { id: 'titulo', label: 'Programa', alignRight: false },
    { id: 'facultad', label: 'Facultad', alignRight: false },
    { id: 'estado', label: 'Estado', alignRight: false },
    { id: '' }
];

const FacultadTable = ({ docs, setDocs }) => {
    const [isOpenModal, openModal, closeModal, contentModal, setContentModal, titleModal, setTitleModal] = useFloat(false);

    const [isOpenAlert, openAlert, closeAlert, contentAlert] = useFloat(
        false,
        "¡Se ha eliminado correctamente el periodo academico!"
    );

    const cells = (row) => {
        const { id, titulo, idFacultad, facultad, estado } = row;

        const options = [
            createOptions('Editar', editFill, () => {
                setTitleModal('Actualizar periodo academico');
                setContentModal(
                    <ProgramaForm
                        id={id}
                        setDocs={setDocs}
                        init={{ titulo, estado, idFacultad }}
                    />
                );
                openModal();
            }),
            createOptions('Eliminar', trash2Outline, () => {
                setTitleModal('Eliminar periodo academico');
                setContentModal(
                    <ProgramaDelete
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
                <TableCell align="left">{facultad}</TableCell>
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
                        {options.map((row, index) =>
                            <MenuItem
                                key={index}
                                onClick={row.onClick}
                                sx={{ color: 'text.secondary' }}
                            >
                                <ListItemIcon>
                                    <Icon icon={row.icon} width={24} height={24} />
                                </ListItemIcon>
                                <ListItemText primary={row.label} primaryTypographyProps={{ variant: 'body2' }} />
                            </MenuItem>
                        )}
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
