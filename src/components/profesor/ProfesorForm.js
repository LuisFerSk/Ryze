import { Grid, TextField, Button, MenuItem } from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";

import ControlError from "../shared/ControlError";
import ControlMensaje from "../shared/ControlMensaje";
import ControlObjectForm from "../shared/ControlObjectForm";
import { validarCorreos } from "../../utils/specialFunctions";
import { initProfesor as init } from "../../_mocks_/profesor";
import { estadosUsuarios as estados } from '../../_mocks_/estados';

const initEstudiante = init("");

const initError = init(false);

const ProfesorForm = ({ init }) => {
    const [mensaje, setMensaje] = ControlMensaje();

    const [error, setError, updateError] = ControlError(initError);

    const [profesor, setProfesor, updateState] = ControlObjectForm(init ? init : initEstudiante, setMensaje);

    const {
        email,
        cedula,
        estado,
        nombres,
        apellidos,
    } = profesor;

    const submitForm = (e) => {
        e.preventDefault();
        setMensaje();

        let error = false;

        if (nombres.length < 3) {
            updateError("nombres", true);
            error = true;
        }

        if (apellidos.length < 3) {
            updateError("apellidos", true);
            error = true;
        }

        if (!validarCorreos(email)) {
            updateError("email", true);
            error = true;
        }

        if (cedula.length !== 10 || cedula < 0) {
            updateError("cedula", true);
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
        setProfesor(initEstudiante);

        if (init) {
            setMensaje("success", "¡Se ha actualizado el registro correctamente!")
            return;
        }

        setMensaje("success", "¡Se ha guardado el registro correctamente!")
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
                        error={error.nombres}
                        helperText={nombres.length < 3 ? "Minimo 3 caracteres" : null}
                        onChange={(e) => {
                            const { value, name } = e.target;

                            if (value.length > 25) {
                                return;
                            }

                            if (value.length >= 3) {
                                updateError(name, false);
                            }

                            updateState(e);
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={12} sm={6} lg={6}>
                    <TextField
                        fullWidth
                        name="apellidos"
                        value={apellidos}
                        label="Apellidos"
                        variant="outlined"
                        error={error.apellidos}
                        helperText={apellidos.length < 3 ? "Minimo 3 caracteres" : null}
                        onChange={(e) => {
                            const { value, name } = e.target;

                            if (value.length > 25) {
                                return;
                            }

                            if (value.length >= 3) {
                                updateError(name, false);
                            }

                            updateState(e);
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                    <TextField
                        fullWidth
                        type="email"
                        name="email"
                        label="Email"
                        value={email}
                        variant="outlined"
                        error={error.email}
                        helperText={!validarCorreos(email) ? "Digite un correo valido ej: correo@correo.com" : null}
                        onChange={(e) => {
                            const { value, name } = e.target;

                            if (validarCorreos(value)) {
                                updateError(name, false);
                            }

                            updateState(e);
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={12} sm={8} lg={8}>
                    <TextField
                        fullWidth
                        type="number"
                        name="cedula"
                        value={cedula}
                        variant="outlined"
                        label="Número de identificación"
                        error={error.cedula}
                        helperText={cedula.trim() === "" || cedula.length !== 10 ? "Campo numerico de 10 digitos" : null}
                        onChange={(e) => {
                            const { value, name } = e.target;

                            if (value.length > 10 || value < 0) {
                                return;
                            }

                            if (value.length === 10) {
                                updateError(name, false);
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
                            const { value, name } = e.target;

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

export default ProfesorForm;
