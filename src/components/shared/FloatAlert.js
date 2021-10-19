import { useContext } from "react";

import { Snackbar, Alert } from "@material-ui/core";

import floatAlertContext from "../provider/FloatAlert/floatAlertContext";

const FloatAlert = () => {
	const floatAlertesContext = useContext(floatAlertContext);
	const { content, open, openState, severity } = floatAlertesContext;

	const handleClose = () => {
		openState(false);
	};

	return (
		<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
			<Alert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
				{content}
			</Alert>
		</Snackbar>
	);
};

export default FloatAlert;
