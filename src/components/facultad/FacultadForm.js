import { useState } from "react";


import { Grid, TextField, Button, MenuItem } from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";
import SaveIcon from "@material-ui/icons/Save";

const initFacultad = {
    titulo: "",
    estado: ""
};

const initError = {
    titulo: false,
    estado: false
};

const estados = [
    { label: "Abierto", value: true },
    { label: "Cerrado", value: false },
]




const FacultadForm = ({ init }) => {
    const [mensaje, setMensaje] = useState();

    const [facultad, setFacultad] = useState(init ? init.data : initFacultad);

    const { titulo, estado } = facultad;

    const [error, setError] = useState(initError);

    const updateState = (e) => {
        setMensaje();
        setFacultad({
            ...facultad,
            [e.target.name]: e.target.value,
        });
    };

    const updateError = (key, value) => {
        setError(old => ({ ...old, [key]: value }));
    }

    const submitForm = (e) => {
        e.preventDefault();

        setMensaje();

        let error = false;

        if (titulo.length < 5) {
            updateError("titulo", true);
            error = true;
        }

        if (typeof estado !== "boolean") {
            updateError("estado", true);
            error = true;
        }

        if (error) {
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

        setError(initError);
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
                        label="Facultad"
                        variant="outlined"
                        error={error.titulo}
                        helperText={titulo.length < 5 ? "Minimo 5 caracteres" : null}
                        onChange={(e) => {
                            if (e.target.value.length > 30) {
                                return;
                            }

                            if (e.target.value.length >= 5) {
                                updateError(e.target.name, false);
                            }

                            updateState(e);
                        }}
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
                        error={error.estado}
                        helperText={typeof estado !== "boolean" ? "Seleccione una opción" : null}
                        onChange={(e) => {
                            updateError(e.target.name, false);
                            updateState(e);
                        }}
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
