import PropTypes from 'prop-types'
import CloseIcon from '@material-ui/icons/Close'
import { Card, Modal, IconButton, Grid, Typography } from '@material-ui/core'

import useStyles from '../../theme/useStylesModal'

const TransitionsModal = ({ children, title, isOpen, close }) => {
    const classes = useStyles()

    return (
        <Grid container spacing={3}>
            <Modal
                open={isOpen}
                onClose={close}
                className={classes.modal}
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
            >
                <Grid item xs={11} md={11} sm={10} lg={10}>
                    <Card className={classes.paper}>
                        <div id='simple-modal-title'>
                            <Typography variant='h6'>
                                {title}
                                <IconButton
                                    left='40%'
                                    color='error'
                                    onClick={close}
                                    aria-label='close'
                                    className={classes.close}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Typography>
                        </div>
                        <Grid
                            item
                            xs={12}
                            md={12}
                            sm={12}
                            lg={12}
                            id='simple-modal-description'
                        >
                            {children}
                        </Grid>
                    </Card>
                </Grid>
            </Modal>
        </Grid>
    )
}

TransitionsModal.prototype = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
}

export default TransitionsModal;
