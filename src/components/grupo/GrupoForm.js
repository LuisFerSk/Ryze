import { useState } from "react";

import { Grid, TextField, Button, MenuItem } from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";
import SaveIcon from "@material-ui/icons/Save";

import profesores from '../../_mocks_/profesor';
import asignaturas from '../../_mocks_/asignatura';

const initGrupo = {
    titulo: "",
    estado: ""
};

const GrupoForm = ({ init }) => {
    const [mensaje, setMensaje] = useState();

    const [grupo, setGrupo] = useState(init ? init.data : initGrupo);

    const { numero, asignatura, profesor } = grupo;

    const updateState = (e) => {
        setMensaje();
        setGrupo({
            ...grupo,
            [e.target.name]: e.target.value,
        });
    };

    const submitForm = (e) => {
        e.preventDefault();

        if (numero.trim() === "" || asignatura.trim() === "" || profesor.trim() === "") {
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

        setGrupo(initGrupo);
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
                        onChange={(e) => updateState(e)}
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
                        onChange={(e) => updateState(e)}
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
                        name="numero"
                        label="Grupo"
                        value={numero}
                        variant="outlined"
                        onChange={updateState}
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
