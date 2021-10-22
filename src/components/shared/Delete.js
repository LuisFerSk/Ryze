import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Grid, TextField, Button } from "@material-ui/core";

import DeleteIcon from '@material-ui/icons/Delete';

const Delete = ({ children, onSubmitFormik, label, mensajeError, value }) => {

    const formik = useFormik({
        initialValues: { value: "" },
        onSubmit: () => onSubmitFormik(),
        validationSchema: Yup.object().shape({
            value: Yup.string().test('len', mensajeError, confi => confi === value)
        }),

    })

    const { errors, touched, handleSubmit, getFieldProps } = formik;

    return (
        <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        {children}
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <TextField
                            fullWidth
                            label={label}
                            variant="outlined"
                            {...getFieldProps("value")}
                            helperText={touched.value && errors.value}
                            error={Boolean(touched.value && errors.value)}
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

export default Delete;
