import React from 'react';
import { MdAdd } from 'react-icons/md';
import PropTypes from 'prop-types';

import { Button } from './styles';

export default function RegisterButton({ onClick, ...rest }) {
  return (
    <Button type="button" onClick={onClick} {...rest}>
      <MdAdd size={20} color="#fff" />
      CADASTRAR
    </Button>
  );
}

RegisterButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
