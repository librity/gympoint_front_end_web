import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './styles';

export default function EditButton({ to, ...rest }) {
  return (
    <Button to={to} {...rest}>
      editar
    </Button>
  );
}

EditButton.propTypes = {
  to: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    state: PropTypes.object.isRequired,
  }).isRequired,
};
