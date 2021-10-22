import PropTypes from 'prop-types';
import { Snackbar, Alert } from "@material-ui/core";

const FloatAlert = ({ children, isOpen, close, severity }) => {
	return (
		<Snackbar
			open={isOpen}
			onClose={close}
			autoHideDuration={3000}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "center"
			}}>
			<Alert elevation={6} variant="filled" onClose={close} severity={severity}>
				{children}
			</Alert>
		</Snackbar>
	);
};

FloatAlert.prototype = {
	children: PropTypes.element.isRequired,
}

export default FloatAlert;
