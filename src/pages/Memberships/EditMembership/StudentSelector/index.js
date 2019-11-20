import React, { useState, useEffect } from 'react';
import Async from 'react-select/async';
import PropTypes from 'prop-types';

import api from '~/services/api';

import { Container } from './styles';

export default function StudentSelector({
  name,
  setStudent,
  defaultValue,
  ...rest
}) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const loadStudentsAndPlans = async () => {
      const loadedStudents = await api.get('/students');

      const studentOptions = [];
      loadedStudents.data.forEach(student =>
        studentOptions.push({ value: student.id, label: student.name })
      );

      setStudents(studentOptions);
    };

    loadStudentsAndPlans();
  }, []);

  const filterStudents = inputValue => {
    return students.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(filterStudents(inputValue));
      }, 1000);
    });

  const handleChange = change => {
    setStudent(change);
  };

  return (
    <Container>
      <Async
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        name={name}
        aria-label={name}
        options={students}
        onChange={handleChange}
        defaultValue={defaultValue}
        {...rest}
      />
    </Container>
  );
}

StudentSelector.propTypes = {
  name: PropTypes.string.isRequired,
  setStudent: PropTypes.func.isRequired,
  defaultValue: PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};
