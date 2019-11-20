import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import api from '~/services/api';

import { Container } from './styles';

export default function PlanSelector({ name, setPlan, defaultValue, ...rest }) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const loadStudentsAndPlans = async () => {
      const loadedPlans = await api.get('/plans');

      const planOptions = [];
      loadedPlans.data.forEach(plan =>
        planOptions.push({
          value: plan.id,
          label: plan.title,
          duration: plan.duration,
          price: plan.price,
          total_price: plan.total_price,
        })
      );

      setPlans(planOptions);
    };

    loadStudentsAndPlans();
  }, []);

  const handleChange = change => (change ? setPlan(change) : setPlan({}));

  return (
    <Container>
      <Select
        name={name}
        aria-label={name}
        options={plans}
        onChange={handleChange}
        defaultValue={defaultValue}
        {...rest}
      />
    </Container>
  );
}

PlanSelector.propTypes = {
  name: PropTypes.string.isRequired,
  setPlan: PropTypes.func.isRequired,
  defaultValue: PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    total_price: PropTypes.number.isRequired,
  }).isRequired,
};
