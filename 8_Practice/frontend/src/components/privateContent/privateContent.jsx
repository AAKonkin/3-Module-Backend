import PropTypes from 'prop-types';
import { Error } from '../error/error';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { ERROR, PROP_TYPES } from '../../constants';
import { checkAccess } from '../../utils';

export const PrivateContent = ({ children, access, serverError = null }) => {
	const userRole = useSelector(selectUserRole);

	const accessError = checkAccess(access, userRole)
		? null
		: ERROR.ACCESS_DENIED;
	const error = serverError || accessError;

	return error ? <Error error={error} /> : children;
};

PrivateContent.propTypes = {
	children: PropTypes.node.isRequired,
	access: PropTypes.arrayOf(PROP_TYPES.ROLE).isRequired,
	serverError: PROP_TYPES.ERROR,
};
