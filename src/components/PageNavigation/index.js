import React from 'react';
import PropTypes from 'prop-types';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Container } from './styles';

export default function PageNavigation({ previous, next }) {
  return (
    <Container>
      <button type="button" onClick={previous}>
        <MdChevronLeft size={20} color="#fff" />
      </button>
      <button type="button" onClick={next}>
        <MdChevronRight size={20} color="#fff" />
      </button>
    </Container>
  );
}

PageNavigation.propTypes = {
  previous: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};
