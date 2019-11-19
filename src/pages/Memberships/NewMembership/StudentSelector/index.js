import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import Async from 'react-select/async';

import api from '~/services/api';

import { Container } from './styles';

export default function StudentSelector({
  name,
  label,
  multiple,
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

  const { fieldName, registerField } = useField(name);

  const ref = useRef();

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value;
    if (!multiple) {
      return selectValue ? selectValue.id : '';
    }

    return selectValue ? selectValue.map(option => option.id) : [];
  }

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'state.value',
        parseValue: parseSelectValue,
        clearValue: selectRef => {
          selectRef.select.clearValue();
        },
      });
    }
  }, [ref.current]); // eslint-disable-line

  return (
    <Container>
      <Async
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        name={fieldName}
        aria-label={fieldName}
        ref={ref}
        {...rest}
      />
    </Container>
  );
}
