import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function EditStudent({ location }) {
  const { student } = location.state;

  console.tron.log(student);

  return (
    <Container>
      <h1>{student.name}</h1>
    </Container>
  );
}

EditStudent.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      student: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        age: PropTypes.number,
        date_of_birth: PropTypes.string,
        weight_metric: PropTypes.number,
        weight_imperial: PropTypes.number,
        height_metric: PropTypes.number,
        height_imperial: PropTypes.number,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
