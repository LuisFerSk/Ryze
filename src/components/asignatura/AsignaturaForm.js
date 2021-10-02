import { useState } from "react";

import { Grid, TextField, Button, MenuItem } from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";
import SaveIcon from "@material-ui/icons/Save";

import estados from "../../_mocks_/estados";
import ControlError from "../shared/ControlError";
import ControlObjectForm from "../shared/ControlObjectForm";
import { initAsignatura as init } from "../../_mocks_/asignatura";

const initAsignatura = init("");

const initError = init(false);

const AsignaturaForm = ({ init }) => {
    const [mensaje, setMensaje] = useState();

    const [asignatura, setAsignatura, updateState] = ControlObjectForm(init ? init : initAsignatura, setMensaje);

    const { codigo, titulo, estado } = asignatura;

    const [error, setError, updateError] = ControlError(initError);

    const submitForm = (e) => {
        e.preventDefault();

        let error = false;

        if (codigo.length < 6) {
            updateError("codigo", true);
            error = true;
        }

        if (titulo.length < 3) {
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

        setError(initError);
        setAsignatura(initAsignatura);

        if (init) {
            setMensaje(
                <Alert severity="success">
                    ¡Se ha actualizado el registro correctamente!
                </Alert>,
            )
            return;
        }

        setMensaje(
            <Alert severity="success">
                ¡Se ha guardado el registro correctamente!
            </Alert>,
        );
    };

    return (
        <form noValidate autoComplete="off" onSubmit={submitForm}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                    <TextField
                        fullWidth
                        name="titulo"
                        value={titulo}
                        label="Asignatura"
                        variant="outlined"
                        error={error.titulo}
                        helperText={titulo.length < 3 ? "Minimo 3 caracteres" : null}
                        onChange={(e) => {
                            if (e.target.value.length > 50) {
                                return;
                            }

                            if (e.target.value.length >= 3) {
                                updateError(e.target.name, false);
                            }

                            updateState(e);
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} sm={8} lg={8}>
                    <TextField
                        fullWidth
                        name="codigo"
                        value={codigo}
                        label="Codigo"
                        variant="outlined"
                        error={error.codigo}
                        helperText={codigo.length !== 6 ? "Campo de 6 caracteres" : null}
                        onChange={(e) => {
                            if (e.target.value.length > 6) {
                                return;
                            }
                            if (e.target.value.length === 6) {
                                updateError(e.target.name, false);
                            }
                            updateState(e);
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6} sm={4} lg={4}>
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
                            const { value, name } = e.target
                            if (typeof value === "boolean") {
                                updateError(name, false);
                            }
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

export default AsignaturaForm;
