import React from 'react';
import { MdDone } from 'react-icons/md';
import PropTypes from 'prop-types';

import { Button } from './styles';

export default function SaveButton({ form, ...rest }) {
  return (
    <Button type="submit" form={form} {...rest}>
      <MdDone size={20} color="#fff" />
      SALVAR
    </Button>
  );
}

SaveButton.propTypes = {
  form: PropTypes.string.isRequired,
};
