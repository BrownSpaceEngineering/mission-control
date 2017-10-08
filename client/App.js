/**
 * Root Component
 */
import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import cookie from 'cookie';
import IntlWrapper from './modules/Intl/IntlWrapper';

// Import Routes
import fetchRoutes from '../server/util/fetchRoutes';

// Base assets
require('./main.css');
import 'bootstrap/scss/bootstrap.scss';

export default function App(props) {
  return (
    <Provider store={props.store}>
      <IntlWrapper>
        <Router history={browserHistory}>
          {fetchRoutes(navigator.userAgent, cookie.parse(document.cookie))}
        </Router>
      </IntlWrapper>
    </Provider>
  );
}

App.propTypes = {
  store: React.PropTypes.object.isRequired,
};
