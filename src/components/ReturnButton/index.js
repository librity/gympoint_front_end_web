import React from 'react';
import { MdChevronLeft } from 'react-icons/md';
import PropTypes from 'prop-types';

import { Button } from './styles';

export default function ReturnButton({ onClick, ...rest }) {
  return (
    <Button type="button" onClick={onClick} {...rest}>
      <MdChevronLeft size={20} color="#fff" />
      VOLTAR
    </Button>
  );
}

ReturnButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
