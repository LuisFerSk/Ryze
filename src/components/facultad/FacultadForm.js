import { useState } from "react";

import { Grid, TextField, Button, MenuItem } from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";
import SaveIcon from "@material-ui/icons/Save";

const initFacultad = {
    titulo: "",
    estado: ""
};

const estados = [
    { label: "Abierto", value: true },
    { label: "Cerrado", value: false },
]

const FacultadForm = ({ init }) => {
    const [mensaje, setMensaje] = useState();

    const [facultad, setFacultad] = useState(init ? init.data : initFacultad);

    const { titulo, estado } = facultad;

    const updateState = (e) => {
        setMensaje();
        setFacultad({
            ...facultad,
            [e.target.name]: e.target.value,
        });
    };

    const submitForm = (e) => {
        e.preventDefault();

        if (titulo.trim() === "" || estado.trim() === "") {
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

        setFacultad(initFacultad);
        setMensaje(
            <Alert severity="success">
                ¡Se ha guardado el registro correctamente!
            </Alert>,
        );
    };

    return (
        <form noValidate autoComplete="off" onSubmit={submitForm}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} sm={8} lg={8}>
                    <TextField
                        fullWidth
                        name="titulo"
                        value={titulo}
                        variant="outlined"
                        onChange={updateState}
                        label="Facultad"
                    />
                </Grid>
                <Grid item xs={12} md={12} sm={4} lg={4}>
                    <TextField
                        select
                        fullWidth
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

export default FacultadForm;
