import { useState } from "react";

import { Grid, TextField, Button } from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";
import SaveIcon from "@material-ui/icons/Save";

const initPeriodoAcademico = {
    titulo: "",
    estado: "",
    fechaFin: "",
    fechaInicio: "",
};

const PeriodoAcademicoForm = ({ init }) => {
    const [mensaje, setMensaje] = useState();

    const [periodoAcademico, setPeriodoAcademico] = useState(init ? init.data : initPeriodoAcademico);

    const { titulo, estado, fechaFin, fechaInicio } = periodoAcademico;

    const updateState = (e) => {
        setMensaje();
        setPeriodoAcademico({
            ...periodoAcademico,
            [e.target.name]: e.target.value,
        });
    };

    const submitForm = (e) => {
        e.preventDefault();

        if (titulo.trim() === "") {
            setMensaje(
                <Alert severity="error">
                    ¡Digite todos los campos antes de continuar!
                </Alert>,
            );
            return;
        }

        if (init) {
            setMensaje(
                <Alert severity="success">
                    ¡Se ha actualizado el registro correctamente!
                </Alert>,
            )
            return;
        }

        setPeriodoAcademico(initPeriodoAcademico);
        setMensaje(
            <Alert severity="success">
                ¡Se ha guardado el registro correctamente!
            </Alert>,
        );

    };

    return (
        <form noValidate autoComplete="off" onSubmit={submitForm}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} sm={6} lg={6}>
                    <TextField
                        fullWidth
                        name="titulo"
                        value={titulo}
                        variant="outlined"
                        onChange={updateState}
                        label="Periodo academico"
                    />
                </Grid>
                <Grid item xs={12} md={12} sm={6} lg={6}>
                    <TextField
                        fullWidth
                        name="estado"
                        label="Estado"
                        value={estado}
                        variant="outlined"
                        onChange={(e) => updateState(e)}
                    />
                </Grid>
                <Grid item xs={12} md={12} sm={6} lg={6}>
                    <TextField
                        fullWidth
                        name="fechaInicio"
                        variant="outlined"
                        value={fechaInicio}
                        onChange={updateState}
                        label="Fecha de inicio"
                    />
                </Grid>
                <Grid item xs={12} md={12} sm={6} lg={6}>
                    <TextField
                        fullWidth
                        name="fechaFin"
                        value={fechaFin}
                        variant="outlined"
                        onChange={updateState}
                        label="Fecha de finalización"
                    />
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                    <Button
                        type="submit"
                        color="primary"
                        variant="outlined"
                        startIcon={<SaveIcon />}
                    >
                        {init ? "Actualizar" : "Registrar"}
                    </Button>
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                    {mensaje}
                </Grid>
            </Grid>
        </form>
    );
};

export default PeriodoAcademicoForm;
