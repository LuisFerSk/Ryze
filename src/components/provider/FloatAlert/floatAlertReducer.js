import { OPEN_FLOAT_ALERT, CONTENT_FLOAT_ALERT, SEVERITY } from "../types";

const floatAlertReducer = (state, action) => {
	switch (action.type) {
		case OPEN_FLOAT_ALERT:
			return {
				...state,
				open: action.payload,
			};
		case CONTENT_FLOAT_ALERT:
			return {
				...state,
				content: action.payload,
			};
		case SEVERITY:
			return {
				...state,
				severity: action.payload,
			};
		default:
			return state;
	}
};

export default floatAlertReducer;
