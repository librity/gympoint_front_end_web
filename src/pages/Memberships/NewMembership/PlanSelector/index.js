import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import Select from 'react-select';

import api from '~/services/api';

import { Container } from './styles';

export default function PlanSelector({
  name,
  label,
  multiple,
  ...rest
}) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const loadStudentsAndPlans = async () => {
      const loadedPlans = await api.get('/plans');

      const planOptions = [];
      loadedPlans.data.forEach(plan =>
        planOptions.push({ value: plan.id, label: plan.title })
      );

      setPlans(planOptions);
    };

    loadStudentsAndPlans();
  }, []);

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
      <Select
        name={fieldName}
        aria-label={fieldName}
        options={plans}
        isMulti={multiple}
        ref={ref}
        {...rest}

      />
    </Container>
  );
}
