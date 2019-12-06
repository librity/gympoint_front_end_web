import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { parseISO, format, addYears, addMonths, startOfToday } from 'date-fns';
import pt from 'date-fns/locale/pt';

import history from '~/services/history';
import api from '~/services/api';

import { formatPricePtBr } from '~/util/format';

import ReturnButton from '~/components/ReturnButton';
import SaveButton from '~/components/SaveButton';
import MembershipForm from '~/components/MembershipForm';

import { Container } from './styles';

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
  const [student, setStudent] = useState({});
  const [plan, setPlan] = useState({});
  const [startDate, setStartDate] = useState();

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

      await api.post(`/students/${student.value}/memberships`, {
        plan_id: plan.value,
        start_date: startDate,
      });

      toast.success('Matrícula cadastrada com sucesso!');
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
          <ReturnButton onClick={navigateManageMemberships} />

          <SaveButton form="membershipForm" />
        </aside>
      </div>

      <MembershipForm
        onSubmit={submitNewMembership}
        student={student}
        setStudent={setStudent}
        plan={plan}
        setPlan={setPlan}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        formatPricePtBr={formatPricePtBr}
      />
    </Container>
  );
}
