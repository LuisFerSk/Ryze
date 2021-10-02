import { Grid, TextField, Button, MenuItem } from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";

import estados from "../../_mocks_/estados";
import ControlMensaje from "../shared/Mensaje";
import facultades from '../../_mocks_/facultad';
import ControlError from "../shared/ControlError";
import { initPrograma as init } from "../../_mocks_/programa";
import ControlObjectForm from "../shared/ControlObjectForm";

const initPrograma = init("");

const initError = init(false);

const ProgramaForm = ({ init }) => {
    const [mensaje, setMensaje] = ControlMensaje();

    const [programa, setPrograma, updateState] = ControlObjectForm(init ? init.data : initPrograma, setMensaje);

    const { titulo, facultad, estado } = programa;

    const [error, setError, updateError] = ControlError(initError);

    const submitForm = (e) => {
        e.preventDefault();

        setMensaje();

        let error = false;

        if (titulo.length < 5) {
            updateError("titulo", true);
            error = true;
        }

        if (facultad.trim() === "") {
            updateError("facultad", true);
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
        setPrograma(initPrograma);

        if (init) {
            setMensaje("success", "¡Se ha actualizado el registro correctamente!");
            return;
        }

        setMensaje("success", "¡Se ha guardado el registro correctamente!");
    };

    return (
        <form noValidate autoComplete="off" onSubmit={submitForm}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                    <TextField
                        fullWidth
                        name="titulo"
                        value={titulo}
                        label="Programa"
                        variant="outlined"
                        error={error.titulo}
                        helperText={titulo.length < 5 ? "Minimo 5 caracteres" : null}
                        onChange={(e) => {
                            const key = e.target.name;
                            if (e.target.value.length > 30) {
                                return;
                            }
                            if (e.target.value.length >= 5) {
                                updateError(key, false);
                            }
                            updateState(e);
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={12} sm={8} lg={8}>
                    <TextField
                        select
                        fullWidth
                        name="facultad"
                        label="Facultad"
                        value={facultad}
                        variant="outlined"
                        error={error.facultad}
                        helperText={facultad.trim() === "" ? "Seleccione una opción" : null}
                        onChange={(e) => {
                            updateError(e.target.name, false);
                            updateState(e);
                        }}
                    >
                        {facultades.map((row, index) =>
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

export default ProgramaForm;
