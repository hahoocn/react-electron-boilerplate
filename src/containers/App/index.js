import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from '../../routes';
import '../../assets/css/main.css';

const App = ({ route }) => <>{renderRoutes(route.routes)}</>;

App.propTypes = {
  route: PropTypes.object.isRequired,
};

export default App;
