import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { formatPricePtBr } from '~/util/format';

import { Container, Content, ProductTable } from './styles';

export default function ManagePlans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const loadPlans = async () => {
      const response = await api.get('plans');

      const data = response.data.map(plan => ({
        ...plan,
        formattedMonthlyPrice: formatPricePtBr(plan.price),
      }));

      setPlans(data);
    };

    loadPlans();
  }, []);

  const navigateNewStudent = () => {
    history.push('/plans/new');
  };

  const handleSearch = async ({ queryName }) => {
    // console.tron.log(queryName);

    const response = await api.get('/plans', {
      params: { name: queryName },
    });

    setPlans(response.data);
  };

  const handleDeleteStudent = async ({ id }) => {
    if (window.confirm('Você tem certeza que deseja remover este plano?')) {
      try {
        await api.delete(`/plans/${id}`);

        handleSearch('');

        toast.success('Aluno apagado com sucesso!');
      } catch (err) {
        toast.error('Falha na ataulização, verifique os dados!');
      }
    }
  };

  return (
    <Container>
      <div>
        <h1>Gerenciando planos</h1>

        <aside>
          <button
            className="navigateNewStudent"
            type="button"
            onClick={navigateNewStudent}
          >
            <MdAdd size={20} color="#fff" />
            CADASTRAR
          </button>
        </aside>
      </div>
      <Content>
        <ProductTable>
          <thead>
            <tr>
              <th className="id">ID</th>
              <th className="title">TÍTULO</th>
              <th className="duration">DURAÇÃO</th>
              <th className="price">VALOR p/ MÊS</th>
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
                  <Link
                    to={{ pathname: '/plans/edit', state: { plan } }}
                    className="edit"
                  >
                    editar
                  </Link>
                  <button
                    className="delete"
                    type="button"
                    onClick={() => handleDeleteStudent(plan)}
                  >
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
      </Content>
    </Container>
  );
}
