import { useFormik, Form, FormikProvider } from 'formik';
import { Grid, TextField, Button, MenuItem } from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";

import { useMensaje } from "../uses";
import estados from "../../_mocks_/estados";
import { facultadServices } from "../../services";
import { facultadSchema, facultadInitialValues } from '../../schema';

const FacultadForm = ({ id, init, setDocs }) => {
    const [mensaje, setMensaje] = useMensaje();

    const formik = useFormik({
        initialValues: id && init ? init : facultadInitialValues,
        validationSchema: facultadSchema,
        onSubmit: (values, { resetForm }) => {
            setMensaje();
            if (id) {
                facultadServices.Update(id, values).then(result => {
                    if (result === true) {
                        setDocs(old => [...old.filter(row => row.id !== id), { id, data: values }]);
                        setMensaje("success", "¡Se ha actualizado el registro correctamente!");
                    } else {
                        console.log(result);
                        setMensaje("error", "¡No se ha podido guardar el registro!");
                    }
                })
                return;
            }
            facultadServices.Add(values)
                .then(result => {
                    if (typeof result === "object" && result.id) {
                        setDocs(old => [...old, { id: result.id, data: values }]);

                        resetForm();
                        setMensaje("success", "¡Se ha guardado el registro correctamente!");
                    } else {
                        console.log(result);
                        setMensaje("error", "¡No se ha podido guardar el registro!");
                    }
                });
        }
    });

    const { errors, touched, handleSubmit, getFieldProps } = formik;

    const titulo = getFieldProps("titulo");
    const estado = getFieldProps("estado");

    return (
        <FormikProvider value={formik} >
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} sm={8} lg={8}>
                        <TextField
                            fullWidth
                            {...titulo}
                            label="Facultad"
                            variant="outlined"
                            helperText={touched.titulo && errors.titulo}
                            error={Boolean(touched.titulo && errors.titulo)}
                            onChange={e => {
                                setMensaje();
                                titulo.onChange(e);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={4} lg={4}>
                        <TextField
                            select
                            fullWidth
                            {...estado}
                            label="Estado"
                            variant="outlined"
                            helperText={touched.estado && errors.estado}
                            error={Boolean(touched.estado && errors.estado)}
                            onChange={e => {
                                setMensaje();
                                estado.onChange(e);
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
            </Form>
        </FormikProvider>
    );
};

export default FacultadForm;
