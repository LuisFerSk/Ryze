import React, { useContext } from "react";

import { Snackbar } from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";
import floatAlertContext from "../provider/FloatAlert/floatAlertContext";

const FloatAlert = () => {
	const floatAlertesContext = useContext(floatAlertContext);
	const { content, open, openState, severity } = floatAlertesContext;

	const handleClose = () => {
		openState(false);
	};

	return (
		<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
			<MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
				{content}
			</MuiAlert>
		</Snackbar>
	);
};

export default FloatAlert;
