import { Grid, CircularProgress } from '@material-ui/core'

const Progress = ({ label }) => {
    return (
        <Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
            style={{ minHeight: '100vh' }}
        >
            <CircularProgress color='success' />
            {label ? label : null}
        </Grid>
    )
}

export default Progress;