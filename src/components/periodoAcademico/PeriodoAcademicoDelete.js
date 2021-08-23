import { useState, useContext } from "react";

import { Grid, TextField, Button } from "@material-ui/core";

import DeleteIcon from '@material-ui/icons/Delete';

import floatAlertContext from "../provider/FloatAlert/floatAlertContext";

const PeriodoAcademicoForm = ({ init }) => {

    const floatAlertesContext = useContext(floatAlertContext);

    const { titulo } = init;

    const [confirmacion, setConfirmacion] = useState("")

    const submitForm = (e) => {
        e.preventDefault();

        if (confirmacion === titulo) {
            floatAlertesContext.contentState(
                "Se ha eliminado del listado de categorias",
            );
            floatAlertesContext.openState(true);
        }
    };

    return (
        <form noValidate autoComplete="off" onSubmit={submitForm}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                    Esta seguro de desea eliminar el periodo academico nombrado como: <strong>{titulo}</strong>, si es así escriba el nombre del periodo abajo
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                    <TextField
                        fullWidth
                        name="titulo"
                        variant="outlined"
                        value={confirmacion}
                        onChange={(e) => setConfirmacion(e.target.value)}
                        label="Periodo academico"
                    />
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                    <Button
                        fullWidth
                        type="submit"
                        color="error"
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                    >
                        Eliminar
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default PeriodoAcademicoForm;
