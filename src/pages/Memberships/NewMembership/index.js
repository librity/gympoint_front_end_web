import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import { Form, Input, useField } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { parseISO, format, addYears, startOfToday } from 'date-fns';
import pt from 'date-fns/locale/pt';

import history from '~/services/history';
import api from '~/services/api';

import { formatPricePtBr } from '~/util/format';

import { Container, Content } from './styles';

import StudentSelector from './StudentSelector';
import PlanSelector from './PlanSelector';

const submitNewMembershipSchema = Yup.object().shape({
  student_id: Yup.number()
    .integer()
    .min(1, 'Insira um aluno válido!')
    .required('O aluno é obrigatório!'),

  plan_id: Yup.number()
    .integer()
    .min(1, 'Insira um plano válido!')
    .required('O plano é obrigatório!'),

  start_date: Yup.date('Insira uma data válida!')
    .min(startOfToday(), 'Matriculas não podem ser criadas retroativamente!')
    .max(
      addYears(new Date(), 3),
      'Matriculas não podem ser agendadas mais do que três anos!'
    )
    .required('A data de início é obrigatória!'),
});

export default function NewMembership() {
  // const [membershipDuration, setMembershipDuration] = useState(0);
  // const [membershipPrice, setMembershipPrice] = useState(0);

  // const totalPrice = useMemo(
  //   () => formatPricePtBr(membershipDuration * membershipPrice),
  //   [membershipDuration, membershipPrice]
  // );

  const ref = useRef();

  const navigateManageMemberships = () => {
    history.push('/memberships');
  };

  const submitNewMembership = async ({ student_id, plan_id, start_date }) => {
    console.tron.log(ref, student_id, plan_id, start_date);
    try {
      const response = await api.post(`/students/${student_id}/memberships`, {
        plan_id,
        start_date,
      });
      console.tron.log(response);

      toast.success('Aluno cadastrado com sucesso!');
      history.push('/memberships');
    } catch (err) {
      toast.error('Falha no cadastro, verifique os dados!');
    }
  };

  return (
    <Container>
      <div className="pageHeader">
        <h1>Cadastro de matrícula</h1>

        <aside>
          <button
            className="navigateManageMemberships"
            type="button"
            onClick={navigateManageMemberships}
          >
            <MdChevronLeft size={20} color="#fff" />
            VOLTAR
          </button>
          <button
            className="submitNewMembership"
            type="submit"
            form="submitNewMembershipForm"
            onClick={() => submitNewMembership(ref)}
          >
            <MdDone size={20} color="#fff" />
            SALVAR
          </button>
        </aside>
      </div>
      <Content>
        <Form
          schema={submitNewMembershipSchema}
          onSubmit={submitNewMembership}
          id="submitNewMembershipForm"
        >
          <label htmlFor="student_id">ALUNO</label>
          <StudentSelector
            name="student_id"
            id="student_id"
            className="studentSelector"
            isSearchable
            isClearable
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
                placeholder="Selecione o plano"
              />
            </span>
            <span>
              <label htmlFor="start_date">DATA DE INÍCIO</label>
              <Input
                className="unformInput"
                id="start_date"
                name="start_date"
                type="date"
                required
              />
            </span>
            <span>
              <label htmlFor="end_date">DATA DE TÉRMINO</label>
              <Input
                className="unformInput"
                id="end_date"
                name="end_date"
                type="date"
                readOnly
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
                // value={totalPrice}
              />
            </span>
          </span>
        </Form>
      </Content>
    </Container>
  );
}
