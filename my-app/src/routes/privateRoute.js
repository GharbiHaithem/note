import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
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

export default PrivateRoute; // Export par défaut ici
