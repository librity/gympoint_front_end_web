/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Content } from './styles';

export default function PlanForm({
  plan,
  schema,
  onSubmit,
  totalPrice,
  setPlanDuration,
  setPlanPrice,
}) {
  return (
    <Content>
      <Form
        schema={schema}
        onSubmit={onSubmit}
        id="studentForm"
        initialData={plan}
      >
        <label htmlFor="title">TÍTULO DO PLANO</label>
        <Input id="title" name="title" type="text" required />
        <span>
          <span>
            <label htmlFor="duration">DURAÇÃO (em meses)</label>
            <Input
              id="duration"
              name="duration"
              type="number"
              required
              onInput={e => setPlanDuration(e.target.value)}
            />
          </span>
          <span>
            <label htmlFor="price">PREÇO MENSAL</label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              required
              onInput={e => setPlanPrice(e.target.value)}
            />
          </span>
          <span>
            <label htmlFor="total_price">PREÇO TOTAL</label>
            <Input
              id="total_price"
              name="total_price"
              type="text"
              readOnly
              value={totalPrice}
            />
          </span>
        </span>
      </Form>
    </Content>
  );
}

PlanForm.propTypes = {
  plan: PropTypes,
  schema: PropTypes.instanceOf(Yup).isRequired,
  onSubmit: PropTypes.func.isRequired,
  totalPrice: PropTypes.string.isRequired,
  setPlanDuration: PropTypes.func.isRequired,
  setPlanPrice: PropTypes.func.isRequired,
};

PlanForm.defaultProps = {
  plan: {},
};
