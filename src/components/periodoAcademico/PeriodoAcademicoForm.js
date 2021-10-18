import { Grid, TextField, Button, MenuItem } from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";

import estados from "../../_mocks_/estados";
import ControlError from "../shared/ControlError";
import ControlMensaje from "../shared/ControlMensaje";
import ControlObjectForm from "../shared/ControlObjectForm";
import TituloPeriodoAcademico from "./PeriodoAcademicoTitulo";
import { periodoAcademicoServices } from "../../services";
import { initPeriodoAcademico as init } from "../../_mocks_/periodoAcademico";

const initPeriodoAcademico = init("");

const initError = init(false);

const PeriodoAcademicoForm = ({ init, setDocs }) => {
    const [mensaje, setMensaje] = ControlMensaje();

    const [periodoAcademico, setPeriodoAcademico, updateState] = ControlObjectForm(init ? init : initPeriodoAcademico, setMensaje);

    const { titulo, estado, fechaFin, fechaInicio } = periodoAcademico;

    const [error, setError, updateError] = ControlError(initError);

    const submitForm = (e) => {
        e.preventDefault();
        setMensaje();

        let error = false;

        if (titulo.trim().length !== 7) {
            updateError("titulo", true);
            error = true;
        } else {
            updateError("titulo", false);
        }

        if (typeof estado !== "boolean") {
            updateError("estado", true);
            error = true;
        } else {
            updateError("estado", false);
        }

        if (fechaInicio.trim() === "" || fechaInicio.trim().length !== 10) {
            updateError("fechaInicio", true);
            error = true;
        } else {
            updateError("fechaInicio", false);
        }

        if (fechaFin.trim() === "" || fechaFin.trim().length !== 10 || fechaInicio >= fechaFin) {
            updateError("fechaFin", true);
            error = true;
        } else {
            updateError("fechaFin", false);
        }

        if (error === true) {
            return;
        }

        if (init) {
            setMensaje("success", "¡Se ha actualizado el registro correctamente!");
            return;
        }

        periodoAcademicoServices.Add(periodoAcademico)
            .then((result) => {
                if (result) {
                    setDocs((old) => [...old, periodoAcademico]);

                    setError(initError);
                    setPeriodoAcademico(initPeriodoAcademico);
                    setMensaje("success", "¡Se ha guardado el registro correctamente!");
                } else {
                    console.log(result);
                    setMensaje("error", "¡No se ha podido guardar el registro!");
                }
            });
        ;
    };

    return (
        <form noValidate autoComplete="off" onSubmit={submitForm}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                        fullWidth
                        name="titulo"
                        value={titulo}
                        variant="outlined"
                        error={error.titulo}
                        onChange={(e) => {
                            if (e.target.value.trim().length === 7) {
                                updateError(e.target.name, false);
                            }
                            updateState(e)
                        }}
                        label="Periodo academico"
                        helperText={
                            titulo.trim().length !== 7 ?
                                "Verifique que el titulo cumpla con el formato Ej: 2020-20"
                                : null
                        }
                        InputProps={{
                            inputComponent: TituloPeriodoAcademico,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                        select
                        fullWidth
                        name="estado"
                        label="Estado"
                        value={estado}
                        variant="outlined"
                        error={error.estado}
                        helperText={typeof estado !== "boolean" ? "Seleccione una opcion" : null}
                        onChange={(e) => {
                            if (typeof e.target.value === "boolean") {
                                updateError(e.target.name, false);
                            }
                            updateState(e)
                        }}
                    >
                        {estados.map((row, index) =>
                            <MenuItem key={index} value={row.value}>
                                {row.label}
                            </MenuItem>
                        )}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                        fullWidth
                        type="date"
                        name="fechaInicio"
                        variant="outlined"
                        value={fechaInicio}
                        label="Fecha de inicio"
                        error={error.fechaInicio}
                        helperText={fechaInicio.trim() === "" ? "Seleccione una fecha inicial" : null}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value.trim() !== "" && value.trim().length === 10) {
                                updateError(e.target.name, false);
                            }
                            if (value < fechaFin) {
                                updateError("fechaFin", false);
                            }
                            updateState(e)
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                        fullWidth
                        type="date"
                        name="fechaFin"
                        value={fechaFin}
                        variant="outlined"
                        error={error.fechaFin}
                        label="Fecha de finalizacion"
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value.trim() !== "" && value.trim().length === 10 && fechaInicio < value) {
                                updateError(e.target.name, false);
                            }
                            updateState(e)
                        }}
                        helperText={
                            fechaInicio.trim() === "" ?
                                "Debe seleccionar una fecha inicial"
                                : fechaInicio >= fechaFin ?
                                    "La fecha final no puede ser menor o igual a la inicial"
                                    : null
                        }
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                    <Button
                        type="submit"
                        variant="outlined"
                        startIcon={<SaveIcon />}
                        color={init ? "info" : "primary"}
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

export default PeriodoAcademicoForm;
