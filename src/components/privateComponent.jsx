import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/services/useAuth';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/signin" />;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
  
export default PrivateRoute;
