import React, { useState, useEffect, useCallback } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import history from '~/services/history';
import api from '~/services/api';

import RegisterButton from '~/components/RegisterButton';
import EditButton from '~/components/EditButton';
import DeleteButton from '~/components/DeleteButton';
import PageNavigation from '~/components/PageNavigation';

import { Container, Scroll, ProductTable } from './styles';

export default function ManageMemberships() {
  const [memberships, setMemberships] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const requestsPerPage = 10;

  const loadMemberships = useCallback(async () => {
    const response = await api.get('/memberships', {
      params: { page, requestsPerPage },
    });

    const data = response.data.rows.map(membership => ({
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
    setCount(response.data.count);
  }, [page]);

  useEffect(() => {
    loadMemberships();
  }, [page, loadMemberships]);

  const navigateNewMemberships = () => {
    history.push('/memberships/new');
  };

  const handleDelete = async ({ id, student }) => {
    if (window.confirm('Você tem certeza que deseja remover esta matrícula?')) {
      try {
        await api.delete(`/students/${student.id}/memberships/${id}`);

        setPage(1);
        loadMemberships();

        toast.success('Matrícula apagada com sucesso!');
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
                  <EditButton
                    to={{
                      pathname: '/memberships/edit',
                      state: { membership },
                    }}
                  />

                  <DeleteButton onClick={handleDelete} remove={membership} />
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
