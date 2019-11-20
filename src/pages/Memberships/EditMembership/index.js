import React, { useState, useMemo } from 'react';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { parseISO, format, addYears, addMonths, startOfToday } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

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

export default function EditMembership({ location }) {
  const { membership } = location.state;

  const [student, setStudent] = useState({
    value: membership.student.id,
    label: membership.student.name,
  });

  const [plan, setPlan] = useState({
    value: membership.plan.id,
    label: membership.plan.title,
    duration: membership.plan.duration,
    price: membership.plan.price,
    total_price: membership.plan.total_price,
  });

  const [startDate, setStartDate] = useState(membership.start_date);

  const endDate = useMemo(() => {
    if (plan.duration && startDate) {
      return format(
        addMonths(parseISO(startDate), plan.duration),
        "dd '/' MM '/' yyyy",
        { locale: pt }
      );
    }
    return 'dd / mm / yyyy';
  }, [startDate, plan.duration]);

  const navigateManageMemberships = () => {
    history.push('/memberships');
  };

  const submitNewMembership = async () => {
    try {
      submitNewMembershipSchema.isValid({
        student_id: student.value,
        plan_id: plan.value,
        start_date: startDate,
      });

      await api.put(`/memberships/${membership.id}`, {
        student_id: student.value,
        plan_id: plan.value,
        start_date: startDate,
      });

      toast.success('Matrícula atualizada com sucesso!');
      history.push('/memberships');
    } catch (err) {
      toast.error('Falha no cadastro, verifique os dados!');
    }
  };

  return (
    <Container>
      <div className="pageHeader">
        <h1>Edição de matrícula</h1>

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
          onSubmit={submitNewMembership}
          id="submitNewMembershipForm"
          initialData={membership}
        >
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
    </Container>
  );
}

EditMembership.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      membership: PropTypes.shape({
        id: PropTypes.number.isRequired,
        start_date: PropTypes.string.isRequired,

        student: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,

        plan: PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          duration: PropTypes.number.isRequired,
          price: PropTypes.number.isRequired,
          total_price: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
