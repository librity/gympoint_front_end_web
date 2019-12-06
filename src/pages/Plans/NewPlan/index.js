import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import history from '~/services/history';
import api from '~/services/api';

import { formatPricePtBr } from '~/util/format';

import ReturnButton from '~/components/ReturnButton';
import SaveButton from '~/components/SaveButton';
import PlanForm from '~/components/PlanForm';

import { Container } from './styles';

const submitNewPlanSchema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório!'),

  duration: Yup.number()
    .integer('Insira número inteiro!')
    .min(1, 'Duração mínima: 1 mês!')
    .max(24, 'Duração máxima: 24 mês!')
    .required('A duração é obrigatória!'),

  price: Yup.number('Insira número!')
    .min(0.0, 'Preço mínimo: R$ 0,00!')
    .max(1000.0, 'Preço máximo: R$ 1000,00!')
    .required('O preço é obrigatório!'),
});

export default function NewPlan() {
  const [planDuration, setPlanDuration] = useState(0);
  const [planPrice, setPlanPrice] = useState(0);

  const totalPrice = useMemo(() => formatPricePtBr(planDuration * planPrice), [
    planDuration,
    planPrice,
  ]);

  const navigateManagePlans = () => {
    history.push('/plans');
  };

  const submitNewPlan = async ({ title, duration, price }) => {
    try {
      await api.post('/plans', {
        title,
        duration,
        price,
      });

      toast.success('Aluno cadastrado com sucesso!');
      history.push('/plans');
    } catch (err) {
      toast.error('Falha no cadastro, verifique os dados!');
    }
  };

  return (
    <Container>
      <div className="pageHeader">
        <h1>Cadastro de plano</h1>

        <aside>
          <ReturnButton onClick={navigateManagePlans} />

          <SaveButton form="studentForm" />
        </aside>
      </div>
      <PlanForm
        schema={submitNewPlanSchema}
        onSubmit={submitNewPlan}
        totalPrice={totalPrice}
        setPlanDuration={setPlanDuration}
        setPlanPrice={setPlanPrice}
      />
    </Container>
  );
}
