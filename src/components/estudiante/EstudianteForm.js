import { useState } from "react";

import { Grid, TextField, Button, MenuItem } from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";
import SaveIcon from "@material-ui/icons/Save";

import programas from '../../_mocks_/programa';

const initFacultad = {
    email: "",
    cedula: "",
    estado: "",
    nombres: "",
    programa: "",
    password: "",
    apellidos: ""
};

const estados = [
    { label: "Abierto", value: true },
    { label: "Cerrado", value: false },
]

const EstudianteForm = ({ init }) => {
    const [mensaje, setMensaje] = useState();

    const [estudiante, setEstudiante] = useState(init ? init.data : initFacultad);

    const {
        email,
        cedula,
        estado,
        nombres,
        programa,
        password,
        apellidos,
    } = estudiante;

    const updateState = (e) => {
        setMensaje();
        setEstudiante({
            ...estudiante,
            [e.target.name]: e.target.value,
        });
    };

    const submitForm = (e) => {
        e.preventDefault();

        if (
            email.trim() === "" ||
            cedula.trim() === "" ||
            estado.trim() === "" ||
            nombres.trim() === "" ||
            programa.trim() === "" ||
            password.trim() === "" ||
            apellidos.trim() === ""
        ) {
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

        setEstudiante(initFacultad);
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
                        name="nombres"
                        value={nombres}
                        label="Nombres"
                        variant="outlined"
                        onChange={updateState}
                    />
                </Grid>
                <Grid item xs={12} md={12} sm={6} lg={6}>
                    <TextField
                        fullWidth
                        name="apellidos"
                        value={apellidos}
                        label="Apellidos"
                        variant="outlined"
                        onChange={updateState}
                    />
                </Grid>
                <Grid item xs={12} md={12} sm={8} lg={8}>
                    <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        value={email}
                        variant="outlined"
                        onChange={updateState}
                    />
                </Grid>
                <Grid item xs={12} md={12} sm={4} lg={4}>
                    <TextField
                        fullWidth
                        name="cedula"
                        value={cedula}
                        variant="outlined"
                        label="Contraseña"
                        onChange={updateState}
                    />
                </Grid><Grid item xs={12} md={12} sm={4} lg={4}>
                    <TextField
                        fullWidth
                        name="cedula"
                        value={cedula}
                        variant="outlined"
                        onChange={updateState}
                        label="Numero de identificación"
                    />
                </Grid>
                <Grid item xs={12} md={12} sm={4} lg={4}>
                    <TextField
                        select
                        fullWidth
                        name="programa"
                        label="Programa"
                        value={programa}
                        variant="outlined"
                        onChange={(e) => updateState(e)}
                    >
                        {programas.map((row, index) =>
                            <MenuItem key={index} value={row.titulo}>
                                {row.titulo}
                            </MenuItem>
                        )}
                    </TextField>
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

export default EstudianteForm;
