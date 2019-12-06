import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { formatPricePtBr } from '~/util/format';

import RegisterButton from '~/components/RegisterButton';
import EditButton from '~/components/EditButton';
import DeleteButton from '~/components/DeleteButton';
import PageNavigation from '~/components/PageNavigation';

import { Container, Scroll, ProductTable } from './styles';

export default function ManagePlans() {
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const requestsPerPage = 10;

  const loadPlans = useCallback(async () => {
    const response = await api.get('plans', {
      params: { page, requestsPerPage },
    });

    const data = response.data.rows.map(plan => ({
      ...plan,
      formattedMonthlyPrice: formatPricePtBr(plan.price),
    }));

    setPlans(data);
    setCount(response.data.count);
  }, [page]);

  useEffect(() => {
    loadPlans();
  }, [page, loadPlans]);

  const navigateNewPlan = () => {
    history.push('/plans/new');
  };

  const handleDelete = async ({ id }) => {
    if (window.confirm('Você tem certeza que deseja remover este plano?')) {
      try {
        await api.delete(`/plans/${id}`);

        setPage(1);
        loadPlans();

        toast.success('Aluno apagado com sucesso!');
      } catch (err) {
        toast.error('Falha na ataulização, verifique os dados!');
      }
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (count - page * requestsPerPage > 0) {
      setPage(page + 1);
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
        <PageNavigation previous={handlePrevious} next={handleNext} />
      </Scroll>
    </Container>
  );
}
