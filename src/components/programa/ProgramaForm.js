import { useFormik, Form, FormikProvider } from 'formik';
import { Grid, TextField, Button, MenuItem } from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";

import estados from "../../_mocks_/estados";
import { programaServices } from "../../services";
import { useMensaje, useGetFacultad } from "../uses";
import { programaInitialValues, programaSchema } from '../../schema';

const ProgramaForm = ({ id, init, setDocs }) => {
    const [mensaje, setMensaje] = useMensaje();

    const [facultades] = useGetFacultad();

    const formik = useFormik({
        initialValues: id && init ? init : programaInitialValues,
        validationSchema: programaSchema,
        onSubmit: (values, { resetForm }) => {
            setMensaje();

            const newValues = { ...values, facultad: facultades.find(row => row.id === values.idFacultad).data.titulo };

            if (id) {
                programaServices.Update(id, newValues)
                    .then(result => {
                        if (result === true) {
                            setDocs(old => [...old.filter(row => row.id !== id), { id, data: newValues }]);
                            setMensaje("success", "¡Se ha actualizado el registro correctamente!");
                        } else {
                            console.log(result);
                            setMensaje("error", "¡No se ha podido guardar el registro!");
                        }
                    })
                return;
            };

            programaServices.Add(newValues)
                .then(result => {
                    if (typeof result === "object" && result.id) {
                        setDocs(old => [...old, { id: result.id, data: newValues }]);

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
    const idFacultad = getFieldProps('idFacultad');

    return (
        <FormikProvider value={formik} >
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <TextField
                            fullWidth
                            {...titulo}
                            label="Programa"
                            variant="outlined"
                            helperText={touched.titulo && errors.titulo}
                            error={Boolean(touched.titulo && errors.titulo)}
                            onChange={(e) => {
                                setMensaje();
                                titulo.onChange(e);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={8} lg={8}>
                        <TextField
                            select
                            fullWidth
                            {...idFacultad}
                            label="Facultad"
                            variant="outlined"
                            helperText={touched.idFacultad && errors.idFacultad}
                            error={Boolean(touched.idFacultad && errors.idFacultad)}
                            onChange={e => {
                                setMensaje();
                                idFacultad.onChange(e);
                            }}
                        >
                            {facultades.map((row, index) =>
                                <MenuItem key={index} value={row.id}>
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

export default ProgramaForm;
