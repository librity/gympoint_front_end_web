import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './styles';

export default function EditButton({ onClick, remove, ...rest }) {
  return (
    <Button type="button" onClick={() => onClick(remove)} {...rest}>
      apagar
    </Button>
  );
}

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  remove: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
