import PropTypes from 'prop-types'

const Providers = ({ children }) => {
	return (
		<>
			{children}
		</>
	)
}

Providers.propTypes = {
	children: PropTypes.element.isRequired,
}

export default Providers;
