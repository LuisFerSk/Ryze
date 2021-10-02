import CustomTable from "../shared/Table"

import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

import { MenuItem, ListItemIcon, TableCell, ListItemText } from '@material-ui/core';

import Label from '../Label';
import Modal from "../shared/Modal";
import UseModal from "../shared/modal/useModal";
import data from '../../_mocks_/periodoAcademico';
import TableMoreMenu from "../shared/table/TableMoreMenu";
import PeriodoAcademicoForm from "./PeriodoAcademicoForm";
import PeriodoAcademicoDelete from "./PeriodoAcademicoDelete";

const headLabel = [
    { id: 'titulo', label: 'Periodo', alignRight: false },
    { id: 'fechaInicio', label: 'Fecha de inicio', alignRight: false },
    { id: 'fechaFin', label: 'Fecha de finalización', alignRight: false },
    { id: 'estado', label: 'Estado', alignRight: false, },
];

const cells = (row) => {
    const { titulo, estado, fechaInicio, fechaFin } = row;

    const [isOpen, openModal, closeModal, content, setContent] = UseModal(false);

    return (
        <>
            <TableCell align="left">{titulo}</TableCell>
            <TableCell align="left">{fechaInicio}</TableCell>
            <TableCell align="left">{fechaFin}</TableCell>
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
                    <MenuItem
                        sx={{ color: 'text.secondary' }}
                        onClick={() => {
                            setContent(<PeriodoAcademicoDelete init={row} />);
                            openModal();
                        }}
                    >
                        <ListItemIcon>
                            <Icon icon={trash2Outline} width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText primary="Eliminar" primaryTypographyProps={{ variant: 'body2' }} />
                    </MenuItem>
                    <MenuItem
                        sx={{ color: 'text.secondary' }}
                        onClick={() => {
                            setContent(<PeriodoAcademicoForm init={row} />);
                            openModal();
                        }}
                    >
                        <ListItemIcon>
                            <Icon icon={editFill} width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText primary="Editar" primaryTypographyProps={{ variant: 'body2' }} />
                    </MenuItem>
                </TableMoreMenu>
            </TableCell>
            <Modal title="Actualizar periodo academico" isOpen={isOpen} closeModal={closeModal}>
                {content}
            </Modal>
        </>
    );
};

const PeriodoAcademicoTable = () => {

    return (
        <CustomTable cells={cells} headLabel={headLabel} data={data} selectBy="titulo" searchBy="titulo" />
    );
};

export default PeriodoAcademicoTable;
