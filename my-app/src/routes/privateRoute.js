import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
export const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const getTokenFromStorage = localStorage.getItem('customer') && JSON.parse(localStorage.getItem('customer'));

  useEffect(() => {
    if (!getTokenFromStorage?.token) {
      navigate('/login');
    }
  }, [getTokenFromStorage?.token, navigate]);

  return getTokenFromStorage?.token !== undefined ? children : null;
};
PrivateRoute.propTypes = {
   children: PropTypes.node.isRequired,
 };
 