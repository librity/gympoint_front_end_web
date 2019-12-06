/* eslint-disable no-shadow */
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import history from '~/services/history';
import api from '~/services/api';

import { formatPricePtBr } from '~/util/format';

import ReturnButton from '~/components/ReturnButton';
import SaveButton from '~/components/SaveButton';
import PlanForm from '~/components/PlanForm';

import { Container } from './styles';

const updatePlanSchema = Yup.object().shape({
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

export default function EditPlan({ location }) {
  const { plan } = location.state;

  const [planDuration, setPlanDuration] = useState(plan.duration);
  const [planPrice, setPlanPrice] = useState(plan.price);

  const totalPrice = useMemo(() => formatPricePtBr(planDuration * planPrice), [
    planDuration,
    planPrice,
  ]);

  const navigateManagePlans = () => {
    history.push('/plans');
  };

  const updatePlan = async ({ title, duration, price }) => {
    try {
      await api.put(`/plans/${plan.id}`, {
        title,
        duration,
        price,
      });

      toast.success('Plano atualizado com sucesso!');
      history.push('/plans');
    } catch (err) {
      toast.error('Falha na ataulização, verifique os dados!');
    }
  };

  return (
    <Container>
      <div className="pageHeader">
        <h1>Edição de plano</h1>

        <aside>
          <ReturnButton onClick={navigateManagePlans} />

          <SaveButton form="studentForm" />
        </aside>
      </div>
      <PlanForm
        plan={plan}
        schema={updatePlanSchema}
        onSubmit={updatePlan}
        totalPrice={totalPrice}
        setPlanDuration={setPlanDuration}
        setPlanPrice={setPlanPrice}
      />
    </Container>
  );
}

EditPlan.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      plan: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
