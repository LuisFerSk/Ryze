import { Card, Modal, IconButton, Grid, Typography } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

import useStyles from "../../theme/modal";

const TransitionsModal = ({ children, title, isOpen, closeModal }) => {
	const classes = useStyles();

	return (
		<Grid container spacing={3}>
			<Modal
				open={isOpen}
				onClose={closeModal}
				className={classes.modal}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<Grid item xs={11} md={11} sm={10} lg={10}>
					<Card className={classes.paper}>
						<div id="simple-modal-title">
							<Typography variant="h6">
								{title}
								<IconButton
									left="40%"
									color="error"
									aria-label="close"
									onClick={closeModal}
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
							id="simple-modal-description"
						>
							{children}
						</Grid>
					</Card>
				</Grid>
			</Modal>
		</Grid>
	);
};

export default TransitionsModal;
