import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AuthenticatedLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { signedIn } = store.getState().auth;

  if (!signedIn && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signedIn && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  const Layout = signedIn ? DefaultLayout : AuthenticatedLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
