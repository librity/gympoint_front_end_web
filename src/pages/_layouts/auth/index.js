import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';

export default function AuthenticatedLayout({ children }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}

AuthenticatedLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
