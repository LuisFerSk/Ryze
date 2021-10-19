import * as Yup from 'yup';
import { useContext } from "react";
import { useFormik, Form, FormikProvider } from 'formik';
import { Grid, TextField, Button } from "@material-ui/core";

import DeleteIcon from '@material-ui/icons/Delete';
import { periodoAcademicoServices } from "../../services";

import floatAlertContext from "../provider/FloatAlert/floatAlertContext";

const PeriodoAcademicoForm = ({ init, setDocs, closeModal }) => {

    const floatAlertesContext = useContext(floatAlertContext);

    const { id, titulo } = init;

    const formik = useFormik({
        initialValues: { titulo: "" },
        validationSchema: Yup.object().shape({
            titulo: Yup.string()
                .test('len', `Digite el título del periodo academico: ${titulo}`, value => value === titulo)
        }),
        onSubmit: () => {
            periodoAcademicoServices.Delete(id).then(result => {
                if (result === true) {
                    setDocs(old => old.filter(row => row.id !== id));
                    floatAlertesContext.contentState("Se ha eliminado del listado de categorias");
                    floatAlertesContext.openState(true);
                    closeModal();
                } else {
                    console.log(result);
                }
            });
        }
    })

    const { errors, touched, handleSubmit, getFieldProps } = formik;

    return (
        <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        Esta seguro de desea eliminar el periodo academico nombrado como: <strong>{titulo}</strong>, si es así escriba el nombre del periodo abajo
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Periodo academico"
                            {...getFieldProps("titulo")}
                            helperText={touched.titulo && errors.titulo}
                            error={Boolean(touched.titulo && errors.titulo)}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <Button
                            fullWidth
                            type="submit"
                            color="error"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                        >
                            Eliminar
                        </Button>
                    </Grid>
                </Grid>
            </Form>
        </FormikProvider>
    );
};

export default PeriodoAcademicoForm;
