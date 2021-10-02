import { useState } from "react";

import { Grid, TextField, Button, MenuItem } from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";
import SaveIcon from "@material-ui/icons/Save";

import profesores from '../../_mocks_/profesor';
import ControlError from "../shared/ControlError";
import asignaturas from '../../_mocks_/asignatura';
import { initGrupo as init } from "../../_mocks_/grupo";
import ControlObjectForm from "../shared/ControlObjectForm";

const initGrupo = init("");

const initError = init(false);

const GrupoForm = ({ init }) => {
    const [mensaje, setMensaje] = useState();

    const [grupo, setGrupo, updateState] = ControlObjectForm(init ? init : initGrupo, setMensaje);

    const { numeroGrupo, asignatura, profesor } = grupo;

    const [error, setError, updateError] = ControlError(initError);

    const submitForm = (e) => {
        e.preventDefault();

        let error = false;

        if (profesor.trim() === "") {
            updateError("profesor", true);
            error = true;
        }

        if (asignatura.trim() === "") {
            updateError("asignatura", true);
            error = true;
        }

        if (numeroGrupo.trim() === "") {
            updateError("numeroGrupo", true);
            error = true;
        }

        if (error) {
            return;
        }

        setGrupo(initGrupo);
        setError(initError);

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
                        select
                        fullWidth
                        name="profesor"
                        label="Profesor"
                        value={profesor}
                        variant="outlined"
                        error={error.profesor}
                        helperText={profesor.trim() === "" ? "Seleccione una opción" : null}
                        onChange={(e) => {
                            const { value, name } = e.target

                            if (value.trim() !== "") {
                                updateError(name, false);
                            }

                            updateState(e);
                        }}
                    >
                        {profesores.map((row, index) =>
                            <MenuItem key={index} value={row.cedula}>
                                {`${row.cedula} - ${row.nombres} ${row.apellidos}`}
                            </MenuItem>
                        )}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={12} sm={8} lg={8}>
                    <TextField
                        select
                        fullWidth
                        name="asignatura"
                        label="Asignatura"
                        value={asignatura}
                        variant="outlined"
                        error={error.asignatura}
                        helperText={asignatura.trim() === "" ? "Seleccione una opción" : null}
                        onChange={(e) => {
                            const { value, name } = e.target

                            if (value.trim() !== "") {
                                updateError(name, false);
                            }

                            updateState(e);
                        }}
                    >
                        {asignaturas.map((row, index) =>
                            <MenuItem key={index} value={row.codigo}>
                                {`${row.codigo} - ${row.titulo}`}
                            </MenuItem>
                        )}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={12} sm={4} lg={4}>
                    <TextField
                        fullWidth
                        type="number"
                        label="Grupo"
                        variant="outlined"
                        name="numeroGrupo"
                        value={numeroGrupo}
                        error={error.numeroGrupo}
                        helperText={"Campo numerico maximo 2 digitos"}
                        onChange={(e) => {
                            const { value, name } = e.target

                            if (value > 99 || value.length > 2) {
                                return;
                            }

                            if (value.trim() !== "") {
                                updateError(name, false);
                            }

                            updateState(e);
                        }}
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

export default GrupoForm;
