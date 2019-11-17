/* eslint-disable no-shadow */
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import history from '~/services/history';
import api from '~/services/api';

import { formatPricePtBr } from '~/util/format';

import { Container, Content } from './styles';

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
      // console.tron.log(err);
      toast.error('Falha na ataulização, verifique os dados!');
    }
  };

  return (
    <Container>
      <div>
        <h1>Edição de plano</h1>

        <aside>
          <button
            className="navigateManagePlans"
            type="button"
            onClick={navigateManagePlans}
          >
            <MdChevronLeft size={20} color="#fff" />
            VOLTAR
          </button>
          <button className="updatePlan" type="submit" form="updatePlanForm">
            <MdDone size={20} color="#fff" />
            SALVAR
          </button>
        </aside>
      </div>
      <Content>
        <Form
          schema={updatePlanSchema}
          onSubmit={updatePlan}
          id="updatePlanForm"
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
