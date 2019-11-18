import React, { useState, useEffect } from 'react';

import api from '~/services/api';

import { Container, Scroll, ProductTable } from './styles';
import AnswerHelpOrderModal from './AnswerHelpOrderModal';

export default function ManageHelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);

  useEffect(() => {
    const loadHelpOrders = async () => {
      const response = await api.get('help_orders');

      setHelpOrders(response.data);
    };

    loadHelpOrders();
  }, []);

  const handleSearch = async ({ queryName }) => {
    const response = await api.get('/help_orders', {
      params: { name: queryName },
    });

    setHelpOrders(response.data);
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
                    handleSearch={handleSearch}
                    className="edit"
                  >
                    responder
                  </AnswerHelpOrderModal>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
      </Scroll>
    </Container>
  );
}
