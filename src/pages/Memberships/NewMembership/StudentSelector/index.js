import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import Async from 'react-select/async';

import api from '~/services/api';

import { Container } from './styles';

export default function StudentSelector({ name, label, multiple, ...rest }) {
  const ref = useRef();

  const [options, setStudents] = useState([]);

  const { fieldName, registerField, defaultValue, error } = useField(
    'student_id'
  );

  // function getDefaultValue() {
  //   if (!defaultValue) return null;

  //   if (!multiple) {
  //     return options.find(option => option.id === defaultValue);
  //   }

  //   return options.filter(option => defaultValue.includes(option.id));
  // }

  useEffect(() => {
    // if (ref.current) {
    registerField({
      name: 'student_id',
      ref: ref.current,
      path: 'dataset.student_id',
      // parseValue: parseSelectValue,
      // clearValue: selectRef => {
      //   selectRef.select.clearValue();
      // },
    });
    // }
  }, [ref.current]); // eslint-disable-line

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
    return options.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(filterStudents(inputValue));
      }, 1000);
    });

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value;
    if (!multiple) {
      return selectValue ? selectValue.id : '';
    }

    return selectValue ? selectValue.map(option => option.id) : [];
  }

  const handleChange = async change => {
    console.tron.log(change);
  };

  return (
    <Container>
      <Async
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        name="student_id"
        aria-label={fieldName}
        ref={ref}
        // defaultValue={getDefaultValue()}
        options={options}
        onChange={handleChange}
        // isMulti={multiple}
        getOptionValue={option => option.value}
        getOptionLabel={option => option.label}
        {...rest}
      />
    </Container>
  );
}
