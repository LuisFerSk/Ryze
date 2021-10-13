import React from 'react';
import PropTypes from 'prop-types';

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

Providers.propTypes = {
	children: PropTypes.element.isRequired
};

export default Providers;
