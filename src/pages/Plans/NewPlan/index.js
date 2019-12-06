import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { formatPricePtBr } from '~/util/format';

import ReturnButton from '~/components/ReturnButton';
import SaveButton from '~/components/SaveButton';
import PlanForm from '~/components/PlanForm';

import PlanSchema from '~/schemas/PlanSchema';

import { Container } from './styles';

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
        schema={PlanSchema}
        onSubmit={submitNewPlan}
        totalPrice={totalPrice}
        setPlanDuration={setPlanDuration}
        setPlanPrice={setPlanPrice}
      />
    </Container>
  );
}
