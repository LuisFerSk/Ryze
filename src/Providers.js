import React from 'react';

import FloatAlertState from "./components/provider/FloatAlert/FloatAlertState";

import FloatAlert from "./components/shared/FloatAlert";

const Providers = ({ children }) => {
	return (
		<FloatAlertState>
			<FloatAlert /> 
			{children} 
		</FloatAlertState>
	);
};

export default Providers;
