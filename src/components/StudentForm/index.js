/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Content } from './styles';

export default function EditStudent({ student, schema, onSubmit }) {
  return (
    <Content>
      <Form
        schema={schema}
        onSubmit={onSubmit}
        id="studentForm"
        initialData={student}
      >
        <label htmlFor="name">NOME COMPLETO</label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          required
        />
        <label htmlFor="email">ENDEREÇO DE E-MAIL</label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="exemplo@email.com"
          required
        />
        <span>
          <span>
            <label htmlFor="date_of_birth">DATA DE NASCIMENTO</label>
            <Input
              id="date_of_birth"
              name="date_of_birth"
              type="date"
              required
            />
          </span>
          <span>
            <label htmlFor="weight_metric">PESO (em kg)</label>
            <Input
              id="weight_metric"
              name="weight_metric"
              type="number"
              placeholder="60"
              required
            />
          </span>
          <span>
            <label htmlFor="height_metric">Altura (em metros)</label>
            <Input
              id="height_metric"
              name="height_metric"
              type="number"
              step="0.01"
              placeholder="1,70"
              required
            />
          </span>
        </span>
      </Form>
    </Content>
  );
}

EditStudent.propTypes = {
  student: PropTypes,
  schema: PropTypes.instanceOf(Yup).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

EditStudent.defaultProps = {
  student: {},
};
