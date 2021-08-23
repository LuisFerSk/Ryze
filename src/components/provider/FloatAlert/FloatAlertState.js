import { useReducer } from "react";
import PropTypes from "prop-types";
import { OPEN_FLOAT_ALERT, CONTENT_FLOAT_ALERT, SEVERITY } from "../types";
import floatAlertContext from "./floatAlertContext";
import floatAlertReducer from "./floatAlertReducer";

const FloatAlertState = ({ children }) => {
	const initialState = {
		open: false,
		content: null,
		severity: "success",
	};

	const [state, dispatch] = useReducer(floatAlertReducer, initialState);

	const openState = (open) => {
		try {
			dispatch({
				type: OPEN_FLOAT_ALERT,
				payload: open,
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	const contentState = (content) => {
		try {
			dispatch({
				type: CONTENT_FLOAT_ALERT,
				payload: content,
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	const severityState = (severity) => {
		try {
			dispatch({
				type: SEVERITY,
				payload: severity,
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	return (
		<floatAlertContext.Provider
			value={{
				open: state.open,
				openState,
				content: state.content,
				contentState,
				severity: state.severity,
				severityState,
			}}
		>
			{children}
		</floatAlertContext.Provider>
	);
};

FloatAlertState.propTypes = {
	children: PropTypes.node,
};

export default FloatAlertState;
