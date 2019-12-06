/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';

import StudentSelector from './StudentSelector';
import PlanSelector from './PlanSelector';

import { Content } from './styles';

export default function MembershipForm({
  membership,
  onSubmit,
  student,
  setStudent,
  plan,
  setPlan,
  startDate,
  setStartDate,
  endDate,
  formatPricePtBr,
}) {
  return (
    <Content>
      <Form onSubmit={onSubmit} id="membershipForm" initialData={membership}>
        <label htmlFor="student_id">ALUNO</label>
        <StudentSelector
          name="student_id"
          id="student_id"
          className="studentSelector"
          isSearchable
          isClearable
          setStudent={setStudent}
          defaultValue={student}
          required
          placeholder="Buscar aluno"
        />
        <span className="horizontalFormSpan">
          <span>
            <label htmlFor="plan_id">PLANO</label>
            <PlanSelector
              name="plan_id"
              id="plan_id"
              className="planSelector"
              isSearchable={false}
              isClearable
              required
              defaultValue={plan}
              placeholder="Selecione o plano"
              setPlan={setPlan}
            />
          </span>
          <span>
            <label htmlFor="start_date">DATA DE INÍCIO</label>
            <Input
              className="unformInput"
              id="start_date"
              name="start_date"
              type="date"
              value={startDate}
              onInput={e => setStartDate(e.target.value)}
              required
            />
          </span>
          <span>
            <label htmlFor="end_date">DATA DE TÉRMINO</label>
            <Input
              className="unformInput"
              id="end_date"
              name="end_date"
              type="text"
              readOnly
              value={endDate}
            />
          </span>
          <span>
            <label htmlFor="total_price">VALOR FINAL</label>
            <Input
              className="unformInput"
              id="total_price"
              name="total_price"
              type="text"
              readOnly
              value={formatPricePtBr(plan.total_price || 0)}
            />
          </span>
        </span>
      </Form>
    </Content>
  );
}

MembershipForm.propTypes = {
  membership: PropTypes,
  onSubmit: PropTypes.func.isRequired,
  student: PropTypes.isRequired,
  setStudent: PropTypes.func.isRequired,
  plan: PropTypes.isRequired,
  setPlan: PropTypes.func.isRequired,
  startDate: PropTypes.isRequired,
  setStartDate: PropTypes.func.isRequired,
  endDate: PropTypes.isRequired,
  formatPricePtBr: PropTypes.func.isRequired,
};

MembershipForm.defaultProps = {
  membership: {},
};
