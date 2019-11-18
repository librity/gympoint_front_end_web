import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import { Form, Input, useField } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import Select from 'react-select';
import * as Yup from 'yup';
import { parseISO, format, addYears, startOfToday } from 'date-fns';
import pt from 'date-fns/locale/pt';

import history from '~/services/history';
import api from '~/services/api';

import { formatPricePtBr } from '~/util/format';

import { Container, Content } from './styles';

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
  const ref = useRef();
  const { defaultValue1, registerField } = useField('plan_id');
  const { defaultValue2, registerField2 } = useField('student_id');

  useEffect(() => {
    registerField();
  }, [ref.current]); // eslint-disable-line

  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const loadStudentsAndPlans = async () => {
      const [loadedStudents, loadedPlans] = await Promise.all([
        api.get('/students'),
        api.get('/plans'),
      ]);

      const studentOptions = [];
      loadedStudents.data.forEach(student =>
        studentOptions.push({ value: student.id, label: student.name })
      );
      console.tron.log(studentOptions);

      const planOptions = [];
      loadedPlans.data.forEach(plan =>
        planOptions.push({ value: plan.id, label: plan.title })
      );
      console.tron.log(planOptions);

      setStudents(studentOptions);
      setPlans(planOptions);
    };

    loadStudentsAndPlans();
  }, []);

  const [membershipDuration, setMembershipDuration] = useState(0);
  const [membershipPrice, setMembershipPrice] = useState(0);

  const totalPrice = useMemo(
    () => formatPricePtBr(membershipDuration * membershipPrice),
    [membershipDuration, membershipPrice]
  );

  const navigateManageMemberships = () => {
    history.push('/memberships');
  };

  const submitNewMembership = async ({ student_id, plan_id, start_date }) => {
    console.tron.log(student_id, plan_id, start_date);
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
          <Select
            name="student_id"
            id="student_id"
            className="SelectorInput"
            isSearchable
            isClearable
            required
            options={students}
            placeholder="Buscar aluno"
          />
          <span className="horizontalFormSpan">
            <span>
              <label htmlFor="plan_id">PLANO</label>
              <Select
                name="plan_id"
                id="plan_id"
                className="SelectorInput"
                isSearchable={false}
                isClearable
                required
                placeholder="Selecione o plano"
                options={plans}
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
                value={totalPrice}
              />
            </span>
          </span>
        </Form>
      </Content>
    </Container>
  );
}
