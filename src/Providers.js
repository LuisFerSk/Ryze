import PropTypes from 'prop-types'
import AuthState from './provider/Auth/AuthState'

const Providers = ({ children }) => {
    return (
        <AuthState>
            {children}
        </AuthState>
    )
}

Providers.propTypes = {
    children: PropTypes.element.isRequired,
}

export default Providers;
