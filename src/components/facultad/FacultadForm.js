import { Grid, TextField, Button, MenuItem } from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";

import estados from "../../_mocks_/estados";
import ControlMensaje from "../shared/Mensaje";
import ControlError from "../shared/ControlError";
import ControlObjectForm from "../shared/ControlObjectForm";
import { initFacultad as init } from "../../_mocks_/facultad";

const initFacultad = init("");

const initError = init(false);

const FacultadForm = ({ init }) => {
    const [mensaje, setMensaje] = ControlMensaje();

    const [facultad, setFacultad, updateState] = ControlObjectForm(init ? init.data : initFacultad, setMensaje);

    const { titulo, estado } = facultad;

    const [error, setError, updateError] = ControlError(initError);

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

        setError(initError);
        setFacultad(initFacultad);

        if (init) {
            setMensaje("success", "¡Se ha actualizado el registro correctamente!");
            return;
        }

        setMensaje("success", "¡Se ha guardado el registro correctamente!");
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
                            if (typeof estado === "boolean") {
                                updateError(e.target.name, false);
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

export default FacultadForm;
