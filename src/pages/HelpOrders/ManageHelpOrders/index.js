import React, { useState, useEffect, useCallback } from 'react';

import api from '~/services/api';

import PageNavigation from '~/components/PageNavigation';

import { Container, Scroll, ProductTable } from './styles';
import AnswerHelpOrderModal from './AnswerHelpOrderModal';

export default function ManageHelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const requestsPerPage = 10;

  const loadHelpOrders = useCallback(async () => {
    const response = await api.get('help_orders', {
      params: { unanswered: true, page, requestsPerPage },
    });

    setHelpOrders(response.data.rows);
    setCount(response.data.count);
  }, [page]);

  useEffect(() => {
    loadHelpOrders();
  }, [loadHelpOrders]);

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
        <h1>Pedidos de auxílio</h1>
      </div>
      <Scroll>
        <ProductTable>
          <thead>
            <tr>
              <th className="studen_name">ALUNO</th>
            </tr>
          </thead>
          <tbody>
            {helpOrders.map(helpOrder => (
              <tr>
                <td className="studen_name">
                  <strong>{helpOrder.student.name}</strong>
                </td>

                <td className="options">
                  <AnswerHelpOrderModal
                    helpOrder={helpOrder}
                    loadHelpOrders={loadHelpOrders}
                    className="edit"
                  >
                    responder
                  </AnswerHelpOrderModal>
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
