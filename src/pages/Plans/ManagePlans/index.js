import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { formatPricePtBr } from '~/util/format';

import RegisterButton from '~/components/RegisterButton';
import EditButton from '~/components/EditButton';
import DeleteButton from '~/components/DeleteButton';

import { Container, Scroll, ProductTable } from './styles';

export default function ManagePlans() {
  const [plans, setPlans] = useState([]);

  const loadPlans = async ({ queryName }) => {
    const response = await api.get('plans', {
      params: { name: queryName },
    });

    const data = response.data.map(plan => ({
      ...plan,
      formattedMonthlyPrice: formatPricePtBr(plan.price),
    }));

    setPlans(data);
  };

  useEffect(() => {
    loadPlans('');
  }, []);

  const navigateNewPlan = () => {
    history.push('/plans/new');
  };

  const handleDelete = async ({ id }) => {
    if (window.confirm('Você tem certeza que deseja remover este plano?')) {
      try {
        await api.delete(`/plans/${id}`);

        loadPlans('');

        toast.success('Aluno apagado com sucesso!');
      } catch (err) {
        toast.error('Falha na ataulização, verifique os dados!');
      }
    }
  };

  return (
    <Container>
      <div className="pageHeader">
        <h1>Gerenciando planos</h1>

        <aside>
          <RegisterButton onClick={navigateNewPlan} />
        </aside>
      </div>
      <Scroll>
        <ProductTable>
          <thead>
            <tr>
              <th className="id">ID</th>
              <th className="title">TÍTULO</th>
              <th className="duration">DURAÇÃO</th>
              <th className="price">VALOR p/MÊS</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr>
                <td className="id">
                  <strong>{plan.id}</strong>
                </td>
                <td className="title">
                  <strong>{plan.title}</strong>
                </td>
                <td className="duration">
                  <strong>{plan.duration}</strong>
                </td>
                <td className="price">
                  <strong>{plan.formattedMonthlyPrice}</strong>
                </td>
                <td className="options">
                  <EditButton
                    to={{ pathname: '/plans/edit', state: { plan } }}
                  />

                  <DeleteButton onClick={handleDelete} remove={plan} />
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
      </Scroll>
    </Container>
  );
}
