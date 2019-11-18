import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '~/services/api';

import { Container, Scroll, ProductTable } from './styles';

const helpOrderAnswerSchema = Yup.object().shape({
  queryName: Yup.string(),
});

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

  const handleAnswerHelpOrder = async () => {};

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
                  <button
                    className="edit"
                    type="button"
                    onClick={() => handleAnswerHelpOrder(helpOrder)}
                  >
                    responder
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
