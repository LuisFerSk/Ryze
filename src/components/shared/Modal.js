import React, { useContext } from "react";

import { Box, Modal, IconButton, Grid, Typography } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

import useStyles from "../../styles/modal";
import modalContext from "../../provider/Modal/modalContext";

const TransitionsModal = () => {
	const classes = useStyles();

	const transitionsModalContext = useContext(modalContext);
	const { content, title, open, openState } = transitionsModalContext;

	const handleClose = () => {
		openState(false);
	};

	return (
		<Grid container spacing={3}>
			<Modal
				open={open}
				onClose={handleClose}
				className={classes.modal}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<Grid item xs={11} md={11} sm={10} lg={10}>
					<Box borderRadius="borderRadius" className={classes.paper}>
						<div id="simple-modal-title">
							<Typography variant="h6">
								{title}
								<IconButton
									left="40%"
									color="secondary"
									aria-label="close"
									onClick={handleClose}
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
							{content}
						</Grid>
					</Box>
				</Grid>
			</Modal>
		</Grid>
	);
};

export default TransitionsModal;
