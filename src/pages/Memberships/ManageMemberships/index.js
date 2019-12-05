import React, { useState, useEffect } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import history from '~/services/history';
import api from '~/services/api';

import RegisterButton from '~/components/RegisterButton';

import { Container, Scroll, ProductTable } from './styles';

export default function ManageMemberships() {
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    const loadMemberships = async () => {
      const response = await api.get('memberships');

      const data = response.data.map(membership => ({
        ...membership,
        formattedTitle: `${membership.plan.symbol} ${membership.plan.title}`,
        formattedStartDate: format(
          parseISO(membership.start_date),
          "d 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
        formattedEndDate: format(
          parseISO(membership.end_date),
          "d 'de' MMMM 'de' yyyy",
          { locale: pt }
        ),
      }));

      setMemberships(data);
    };

    loadMemberships();
  }, [memberships]);

  const navigateNewMemberships = () => {
    history.push('/memberships/new');
  };

  const handleSearch = async ({ queryName }) => {
    const response = await api.get('/memberships', {
      params: { name: queryName },
    });

    setMemberships(response.data);
  };

  const handleDeleteMembership = async ({ id, student }) => {
    if (window.confirm('Você tem certeza que deseja remover esta matrícula?')) {
      try {
        await api.delete(`/students/${student.id}/memberships/${id}`);

        handleSearch('');

        toast.success('Matrícula apagada com sucesso!');
      } catch (err) {
        toast.error('Falha na ataulização, verifique os dados!');
      }
    }
  };

  return (
    <Container>
      <div className="pageHeader">
        <h1>Gerenciando matrículas</h1>

        <aside>
          <RegisterButton onClick={navigateNewMemberships} />
        </aside>
      </div>
      <Scroll>
        <ProductTable>
          <thead>
            <tr>
              <th className="id">ID</th>
              <th className="student_name">ALUNO</th>
              <th className="plan_title">PLANO</th>
              <th className="start_date">INÍCIO</th>
              <th className="end_date">TÉRMINO</th>
              <th className="active">ATIVA</th>
            </tr>
          </thead>
          <tbody>
            {memberships.map(membership => (
              <tr>
                <td className="id">
                  <strong>{membership.id}</strong>
                </td>
                <td className="student_name">
                  <strong>{membership.student.name}</strong>
                </td>
                <td className="plan_title">
                  <strong>{membership.formattedTitle}</strong>
                </td>
                <td className="start_date">
                  <strong>{membership.formattedStartDate}</strong>
                </td>
                <td className="end_date">
                  <strong>{membership.formattedEndDate}</strong>
                </td>
                <td className="active">
                  {membership.active ? (
                    <MdCheckCircle size={20} color="#42cb59" />
                  ) : (
                    <MdCheckCircle size={20} color="#eee" />
                  )}
                </td>
                <td className="options">
                  <Link
                    to={{
                      pathname: '/memberships/edit',
                      state: { membership },
                    }}
                    className="edit"
                  >
                    editar
                  </Link>
                  <button
                    className="delete"
                    type="button"
                    onClick={() => handleDeleteMembership(membership)}
                  >
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
      </Scroll>
    </Container>
  );
}
