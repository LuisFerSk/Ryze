import { useState } from "react";

import { Grid, TextField, Button, MenuItem } from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";
import SaveIcon from "@material-ui/icons/Save";

const initAsignatura = {
    codigo: "",
    titulo: "",
    estado: "",
    creditos: "",
    horasSemanales: ""
};

const estados = [
    { label: "Abierto", value: true },
    { label: "Cerrado", value: false },
]

const AsignaturaForm = ({ init }) => {
    const [mensaje, setMensaje] = useState();

    const [asignatura, setAsignatura] = useState(init ? init.data : initAsignatura);

    const { codigo, titulo, estado, horasSemanales, creditos } = asignatura;

    const updateState = (e) => {
        setMensaje();
        setAsignatura({
            ...asignatura,
            [e.target.name]: e.target.value,
        });
    };

    const submitForm = (e) => {
        e.preventDefault();

        if (codigo.trim() === "" || titulo.trim() === "" || estado.trim() === "" || horasSemanales.trim() === "" || creditos.trim() === "") {
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

        setAsignatura(initAsignatura);
        setMensaje(
            <Alert severity="success">
                ¡Se ha guardado el registro correctamente!
            </Alert>,
        );
    };

    return (
        <form noValidate autoComplete="off" onSubmit={submitForm}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} sm={4} lg={4}>
                    <TextField
                        fullWidth
                        name="codigo"
                        value={codigo}
                        label="Codigo"
                        variant="outlined"
                        onChange={updateState}
                    />
                </Grid>
                <Grid item xs={12} md={12} sm={8} lg={8}>
                    <TextField
                        fullWidth
                        name="titulo"
                        value={titulo}
                        variant="outlined"
                        label="Asignatura"
                        onChange={updateState}
                    />
                </Grid>
                <Grid item xs={12} md={12} sm={5} lg={5}>
                    <TextField
                        fullWidth
                        name="creditos"
                        value={creditos}
                        variant="outlined"
                        onChange={updateState}
                        label="Número de creditos"
                    />
                </Grid>
                <Grid item xs={12} md={12} sm={5} lg={5}>
                    <TextField
                        fullWidth
                        type="number"
                        variant="outlined"
                        name="horasSemanales"
                        value={horasSemanales}
                        onChange={updateState}
                        label="Horas semanales"
                    />
                </Grid>
                <Grid item xs={12} md={6} sm={2} lg={2}>
                    <TextField
                        select
                        fullWidth
                        type="number"
                        name="estado"
                        label="Estado"
                        value={estado}
                        variant="outlined"
                        onChange={(e) => updateState(e)}
                    >
                        {estados.map((row, index) =>
                            <MenuItem key={index} value={row.value}>
                                {row.label}
                            </MenuItem>
                        )}
                    </TextField>
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

export default AsignaturaForm;
