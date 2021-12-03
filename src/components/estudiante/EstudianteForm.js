import { useFormik, Form, FormikProvider } from 'formik';
import { Grid, TextField, Button, MenuItem } from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";

import estados from "../../_mocks_/estados";
import { useMensaje, useGetDocs } from "../uses";
import { estudianteServices, programaServices } from "../../services";
import { estudianteSchema, estudianteInitialValues } from '../../schema';

const EstudianteForm = ({ id, init, setDocs }) => {
    const [mensaje, setMensaje] = useMensaje();

    const [programas] = useGetDocs(programaServices.Get());

    const formik = useFormik({
        initialValues: id && init ? init : estudianteInitialValues,
        validationSchema: estudianteSchema,
        onSubmit: (values, { resetForm }) => {
            setMensaje();

            if (id) {
                estudianteServices.Update(id, values).then(result => {
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
            estudianteServices.Add(values)
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

    const email = getFieldProps("email");
    const cedula = getFieldProps("cedula");
    const estado = getFieldProps("estado");
    const nombres = getFieldProps("nombres");
    const programa = getFieldProps("programa");
    const apellidos = getFieldProps("apellidos");

    return (
        <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} sm={6} lg={6}>
                        <TextField
                            fullWidth
                            {...nombres}
                            label="Nombres"
                            variant="outlined"
                            helperText={touched.nombres && errors.nombres}
                            error={Boolean(touched.nombres && errors.nombres)}
                            onChange={e => {
                                setMensaje();
                                nombres.onChange(e);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={6} lg={6}>
                        <TextField
                            fullWidth
                            {...apellidos}
                            label="Apellidos"
                            variant="outlined"
                            helperText={touched.apellidos && errors.apellidos}
                            error={Boolean(touched.apellidos && errors.apellidos)}
                            onChange={e => {
                                setMensaje();
                                apellidos.onChange(e);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <TextField
                            fullWidth
                            {...email}
                            type="email"
                            label="Email"
                            variant="outlined"
                            helperText={touched.email && errors.email}
                            error={Boolean(touched.email && errors.email)}
                            onChange={e => {
                                setMensaje();
                                email.onChange(e);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={4} lg={4}>
                        <TextField
                            fullWidth
                            type="number"
                            {...cedula}
                            variant="outlined"
                            label="Número de identificación"
                            helperText={touched.cedula && errors.cedula}
                            error={Boolean(touched.cedula && errors.cedula)}
                            onChange={e => {
                                setMensaje();
                                cedula.onChange(e);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={4} lg={4}>
                        <TextField
                            select
                            fullWidth
                            {...programa}
                            label="Programa"
                            variant="outlined"
                            helperText={touched.programa && errors.programa}
                            error={Boolean(touched.programa && errors.programa)}
                            onChange={e => {
                                setMensaje();
                                programa.onChange(e);
                            }}
                        >
                            {programas.map((row, index) =>
                                <MenuItem key={index} value={row.data.titulo}>
                                    {row.data.titulo}
                                </MenuItem>
                            )}
                        </TextField>
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

export default EstudianteForm;
